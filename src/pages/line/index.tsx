import { useEffect, useCallback, useRef } from "react";
import { Box } from "@chakra-ui/react";

const Line = () => {
  const liffId = process.env.NEXT_PUBLIC_LIFF_ID;

  const initLiff = useCallback(async () => {
    try {
      const liffModule = await import("@line/liff");
      const liff = liffModule.default;

      if (liffId) {
        await liff.init({ liffId });
      }

      if (liff.isInClient()) {
        liff.openWindow({
          url: "https://line-test-six.vercel.app/line/confirmation",
          external: true,
        });
      }
    } catch (error) {
      console.error("LIFFの初期化に失敗", error);
    }
  }, [liffId]);

  useEffect(() => {
    initLiff();
  }, [initLiff]);

  return <Box>LINE内部ブラウザだよ</Box>
};

export default Line;
