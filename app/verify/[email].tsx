import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import Colors from "@/constants/Colors";
import { getCustomTabsSupportingBrowsersAsync } from "expo-web-browser";
import { useSignIn, useSignUp } from "@clerk/clerk-expo";
import { defaultClerkAPIError } from "@/constants/Errors";

const CELL_COUNT = 6;

const Page = () => {
  const { email, login } = useLocalSearchParams<{
    email: string;
    login: string;
  }>();
  const { signUp, setActive } = useSignUp();
  const { signIn } = useSignIn();
  const [code, setCode] = useState("");
  const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  useEffect(() => {
    if (code.length === 6) {
      if (login === "true") {
        verifySignIn();
      } else {
        verifyCode();
      }
    }
  }, [code]);

  const verifyCode = async () => {
    try {
      await signUp!.attemptEmailAddressVerification({ code });

      await setActive!({ session: signUp!.createdSessionId });
    } catch (err) {
      defaultClerkAPIError(err);
    }
  };
  const verifySignIn = async () => {
    try {
      await signIn!.attemptFirstFactor({ strategy: "email_code", code });

      await setActive!({ session: signIn!.createdSessionId });
    } catch (err) {
      defaultClerkAPIError(err);
    }
  };
  const resendCode = async () => {
    try {
      if (login === "true") {
        const { supportedFirstFactors } = await signIn!.create({
          identifier: email,
        });

        const firstPhoneFactor: any = supportedFirstFactors?.find(
          (factor: any) => {
            return factor.strategy === "email_code";
          }
        );

        const { emailAddressId } = firstPhoneFactor;

        await signIn!.prepareFirstFactor({
          strategy: "email_code",
          emailAddressId,
        });
      } else {
        await signUp!.create({
          emailAddress: email,
        });
        signUp!.prepareEmailAddressVerification();
      }
    } catch (err) {
      defaultClerkAPIError(err);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerTitle: email }} />
      <Text style={styles.legal}>
        We have sent you an email with a code to the email address above.
      </Text>
      <Text style={styles.legal}>
        To complete your email verification, please enter the 6-digit activation
        code.
      </Text>

      <CodeField
        ref={ref}
        {...props}
        value={code}
        onChangeText={setCode}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <View
            // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
            onLayout={getCellOnLayoutHandler(index)}
            key={index}
            style={[styles.cellRoot, isFocused && styles.focusCell]}
          >
            <Text style={styles.cellText}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />

      <TouchableOpacity style={styles.button} onPress={resendCode}>
        <Text style={styles.buttonText}>
          Didn't receive a verification code?
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: Colors.background,
    gap: 20,
  },
  legal: {
    fontSize: 14,
    textAlign: "center",
    color: "#000",
  },
  button: {
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: Colors.primary,
    fontSize: 18,
  },
  codeFieldRoot: {
    marginTop: 20,
    width: 260,
    marginLeft: "auto",
    marginRight: "auto",
    gap: 4,
  },
  cellRoot: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  cellText: {
    color: "#000",
    fontSize: 30,
    textAlign: "center",
  },
  focusCell: {
    paddingBottom: 4,
    borderBottomColor: "#000",
    borderBottomWidth: 2,
  },
});

export default Page;