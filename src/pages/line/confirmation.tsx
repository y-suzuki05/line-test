import { useEffect, useCallback, useRef, useState } from "react";
import { Box, Text, Button } from "@chakra-ui/react";
import { Liff } from "@line/liff";

const Confirmation = () => {
  const liffRef = useRef<Liff | null>(null);
  const [accessToken, setAccessToken] = useState<string>("");
  const liffId = process.env.NEXT_PUBLIC_LIFF_ID;

  const initLiff = useCallback(async () => {
    try {
      const liffModule = await import("@line/liff");
      const liff = liffModule.default;

      if (liffId) {
        await liff.init({ liffId });
        alert(liff.isLoggedIn());
      }

      if (!liff.isLoggedIn()) {
        liff.login({
          redirectUri: "https://line-test-six.vercel.app/line/confirmation",
        });
      }

      liffRef.current = liff;
    } catch (error) {
      console.error("LIFFの初期化に失敗", error);
    }
  }, [liffId]);

  const getAccessToken = () => {
    alert(liffId);
    const accessToken = liffRef.current?.getAccessToken();
    alert(accessToken);
    accessToken && setAccessToken(accessToken);
  };

  const logout = () => {
    liffRef.current?.logout();
  };

  useEffect(() => {
    initLiff();
  }, [initLiff]);

  return (
    <Box>
      <Text>LINE連携しますか？</Text>
      <Button onClick={() => logout()}>ログアウト</Button>
      <Button onClick={() => getAccessToken()}>許可する</Button>
      <Box>アクセストークン：{accessToken}</Box>
    </Box>
  );
};

export default Confirmation;
