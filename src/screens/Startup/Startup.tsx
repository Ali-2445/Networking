import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { fetchOne } from "@/services/users";
import { useTranslation } from "react-i18next";

import { useTheme } from "@/theme";
import { Brand } from "@/components/molecules";
import { SafeScreen } from "@/components/template";

import type { ApplicationScreenProps } from "@/types/navigation";

function Startup({ navigation }: ApplicationScreenProps) {
  const { layout, gutters, fonts, backgrounds } = useTheme();
  const { t } = useTranslation(["startup"]);

  const [currentId, setCurrentId] = useState(0);

  const { isSuccess, data, isFetching, isError } = useQuery({
    queryKey: ["example", currentId],
    queryFn: () => {
      return fetchOne(currentId);
    },
    enabled: currentId >= 0,
  });

  useEffect(() => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Example" }],
    });
  }, [isSuccess]);

  return (
    <SafeScreen>
      <View
        style={[
          layout.flex_1,
          layout.col,
          layout.itemsCenter,
          layout.justifyCenter,
          backgrounds.white,
        ]}
      >
        <Brand />
        {isFetching && (
          <ActivityIndicator size="large" style={[gutters.marginVertical_24]} />
        )}
        {isError && (
          <Text style={[fonts.size_16, fonts.danger]}>
            {t("startup:error")}
          </Text>
        )}
      </View>
    </SafeScreen>
  );
}

export default Startup;
