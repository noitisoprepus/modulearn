import CaptionedImage from "@/components/CaptionedImage";
import DynamicText from "@/components/DynamicText";
import InfoCard from "@/components/InfoCard";
import RecallCard from "@/components/interactive/RecallCard";
import ScreenWrapper from "@/components/ScreenWrapper";
import Spacer from "@/components/Spacer";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function Module() {
  const { title } = useLocalSearchParams();

  const parsedTitle =
    typeof title === "string"
      ? title
      : Array.isArray(title)
      ? title[0]
      : undefined;

  return (
    <ScreenWrapper showAppBar appBarTitle={parsedTitle}>
      <ScrollView style={styles.page}>
        {/* can turn this into section component */}
        <DynamicText variant="header">
          Module 1: Introduction to STS
        </DynamicText>
        <Spacer size={20} />
        <View style={styles.layout}>
          <DynamicText>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Consectetur dolores eveniet deleniti natus exercitationem officiis
            nihil obcaecati ratione maiores, velit dolorum nobis optio
            reprehenderit maxime reiciendis debitis fugit atque itaque.
          </DynamicText>
          <CaptionedImage
            imgSrc={require("@/assets/images/raccoon.webp")}
            caption="a raccoon taking a selfie"
          />
          <DynamicText>
            Animi a repellat ea illo dignissimos minima at perferendis,
            molestiae consequatur ad maiores est culpa odio eum libero
            quibusdam, repudiandae quis blanditiis.
          </DynamicText>
          <RecallCard />
          <DynamicText variant="header">I. Lorem Ipsum</DynamicText>
          {/* need to not be affected by gap */}
          <DynamicText>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti,
            commodi illum praesentium impedit nulla ea debitis corrupti quae.
            Aperiam alias accusamus aspernatur ex? Vitae eum debitis delectus
            expedita. Obcaecati, ea? Animi a repellat ea illo dignissimos minima
            at perferendis, molestiae consequatur ad maiores est culpa odio eum
            libero quibusdam, repudiandae quis blanditiis.
          </DynamicText>
          <InfoCard variant="fact" />
          <DynamicText>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus,
            recusandae et tenetur iste tempora obcaecati.
          </DynamicText>
          <InfoCard variant="remember" />
          <Spacer size={150} />
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  layout: {
    gap: 30,
  },
});

// TODO : fetch data, additional sections (new page)
