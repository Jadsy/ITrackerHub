<template>
  <v-card height="330px" class="scroll">
    <v-card-title>Recent Activity</v-card-title>
    <template>
        <v-container class="fill-height">
          <v-row align="center">
            <v-row justify="end">
              <div class="text-h5 font-weight-light">
                Monday
                <strong class="text-h1 font-weight-regular mr-6" style="position: relative;">8</strong>
              </div>
              <div class="text-uppercase font-weight-light" style="position:relative;">
                February 2015
              </div>
            </v-row>
          </v-row>
        </v-container>
    <v-card-text class="py-0">
      <v-timeline
        align-top
        dense
      >
        <v-timeline-item
          color="pink"
          small
        >
          <v-row class="pt-1">
            <v-col cols="3">
              <strong>5pm</strong>
            </v-col>
            <v-col>
              <strong>New Icon</strong>
              <div class="text-caption">
                Mobile App
              </div>
            </v-col>
          </v-row>
        </v-timeline-item>

        <v-timeline-item
          color="teal lighten-3"
          small
        >
          <v-row class="pt-1">
            <v-col cols="3">
              <strong>3-4pm</strong>
            </v-col>
            <v-col>
              <strong>Design Stand Up</strong>
              <div class="text-caption mb-2">
                Hangouts
              </div>
              <v-avatar>
                <v-img
                  src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairFrida&accessoriesType=Kurt&hairColor=Red&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=GraphicShirt&clotheColor=Gray01&graphicType=Skull&eyeType=Wink&eyebrowType=RaisedExcitedNatural&mouthType=Disbelief&skinColor=Brown"
                ></v-img>
              </v-avatar>
              <v-avatar>
                <v-img
                  src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairFrizzle&accessoriesType=Prescription02&hairColor=Black&facialHairType=MoustacheMagnum&facialHairColor=BrownDark&clotheType=BlazerSweater&clotheColor=Black&eyeType=Default&eyebrowType=FlatNatural&mouthType=Default&skinColor=Tanned"
                ></v-img>
              </v-avatar>
              <v-avatar>
                <v-img
                  src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairMiaWallace&accessoriesType=Sunglasses&hairColor=BlondeGolden&facialHairType=Blank&clotheType=BlazerSweater&eyeType=Surprised&eyebrowType=RaisedExcited&mouthType=Smile&skinColor=Pale"
                ></v-img>
              </v-avatar>
            </v-col>
          </v-row>
        </v-timeline-item>

        <v-timeline-item
          color="pink"
          small
        >
          <v-row class="pt-1">
            <v-col cols="3">
              <strong>12pm</strong>
            </v-col>
            <v-col>
              <strong>Lunch break</strong>
            </v-col>
          </v-row>
        </v-timeline-item>

        <v-timeline-item
          color="teal lighten-3"
          small
        >
          <v-row class="pt-1">
            <v-col cols="3">
              <strong>9-11am</strong>
            </v-col>
            <v-col>
              <strong>Finish Home Screen</strong>
              <div class="text-caption">
                Web App
              </div>
            </v-col>
          </v-row>
        </v-timeline-item>
      </v-timeline>
    </v-card-text>
</template>
  </v-card>
</template>

<style scoped>
.scroll {
  overflow-y: scroll;
}
.text-h5 {
  position:relative; margin-right:290px; top:-150px;
}
.text-h1{
  top: 30px;
}
.text-uppercase{
  margin-right:150px;top: -182px;font-size: 21px;
}

</style>
