<template>
  <div
    class="dots-wrapper"
    id="dots-wrapper"
    @mouseover.stop="dotsHovered()"
    @mouseout="dotsNotHovered()"
    @mouseup="dotsHovered()"
  >
    <div
      id="red-dot"
      class="dot"
      v-if="!thisIsASmartPhone"
      :style="{ 'background-image': closeDot }"
      @mousedown="dotsClicked('close')"
      @click="emit('close')"
    ></div>

    <div
      id="yellow-dot"
      class="dot"
      v-if="!thisIsASmartPhone"
      :style="{ 'background-image': minDot }"
      @mousedown="dotsClicked('min')"
      @click="setWindowState(props.id, 'minimized')"
    ></div>

    <div
      id="green-dot"
      v-if="props.isMaximizable"
      class="dot"
      :style="{ 'background-image': maxDot }"
      @mousedown="dotsClicked('max')"
      @click="emit('maximize')"
    ></div>
  </div>
</template>

<script>
import { ref } from "vue";
import { K, X } from "../assets/constants";
import { setWindowState } from "../store/state";
import { isSmartPhone } from "../assets/scripts";

export default {
  props: ["name", "id", "isMaximizable"],
  setup(props, { emit }) {
    const thisIsASmartPhone = isSmartPhone;

    // preload images
    Object.entries(X).forEach(([_, image]) => {
      let img = new Image();
      img.src = image;
    });

    const closeDot = ref(K.closeDotNormal);
    const minDot = ref(K.minimizeDotNormal);
    const maxDot = ref(K.maximizeDotNormal);

    if (thisIsASmartPhone) {
      closeDot.value = K.closeDotPrelight;
      minDot.value = K.minimizeDotPrelight;
      maxDot.value = K.maximizeDotPrelight;
    }

    function dotsHovered() {
      closeDot.value = K.closeDotPrelight;
      minDot.value = K.minimizeDotPrelight;
      maxDot.value = K.maximizeDotPrelight;
    }

    function dotsNotHovered() {
      if (!thisIsASmartPhone) {
        closeDot.value = K.closeDotNormal;
        minDot.value = K.minimizeDotNormal;
        maxDot.value = K.maximizeDotNormal;
      }
    }

    function dotsClicked(dot) {
      if (dot === "close") {
        closeDot.value = K.closeDotClicked;
      } else if (dot === "min") {
        minDot.value = K.minimizeDotClicked;
      } else if (dot === "max") {
        maxDot.value = K.maximizeDotClicked;
      }
    }

    return {
      dotsHovered,
      dotsNotHovered,
      dotsClicked,
      maxDot,
      minDot,
      closeDot,
      props,
      setWindowState,
      emit,
      X,
      thisIsASmartPhone,
    };
  },
};
</script>

<style lang="scss">
.dots-wrapper {
  display: flex;
  margin: 0;
  padding: 2px 0 0 2px;
  width: max-content;
  background-color: inherit;

  .dot {
    height: 16px;
    width: 16px;
    border-radius: 50%;
    margin: 2px 3px 2px 2px;
    box-shadow: 30px 29px 120px -33px rgba(0, 0, 0, 0.56);
  }

  #green-dot {
    background-image: url("../assets/buttons/maximize.png");
    background-position: center;
    background-size: cover;
  }

  #yellow-dot {
    background-image: url("../assets/buttons/minimize.png");
    background-position: center;
    background-size: cover;
  }

  #red-dot {
    background-position: center;
    background-size: cover;
  }
}
</style>
