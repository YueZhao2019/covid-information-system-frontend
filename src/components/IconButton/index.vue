<template>
  <div
    v-on="$listeners"
    class="iconButton"
    :class="className"
    :title="title"
  ></div>
</template>
<script>
export default {
  props: {
    type: {
      type: String
    },
    title: {
      type: String
    }
  },
  computed: {
    className() {
      return {
        [`iconButton-${this.type}`]: true
      };
    }
  }
};
</script>
<style lang="scss" scoped>
.iconButton {
  width: 28px;
  height: 28px;
  display: inline-block;
  margin: 0 5px;
  background-position: center center;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #579fff;
  }
}

@each $iconName in edit, remove {
  .iconButton-#{$iconName} {
    background-image: url("./images/#{$iconName}.png");
    &:hover {
      background-image: url("./images/#{$iconName}_active.png");
    }
  }
}
</style>