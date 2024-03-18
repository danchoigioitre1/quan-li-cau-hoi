<template>
  <div class="combobox-container">
    <input
      type="text"
      :placeholder="placeholder"
      class="combobox-input"
      @click="showList"
      v-click-outside="closeList"
      v-model="inputValue"
    />
    <i
      @click="showList"
      v-if="!isSelected"
      :class="{ 'open-rotate': isShowList }"
      class="bx bx-chevron-down combobox-icon"
    ></i>

    <button v-if="isSelected" class="button--clear" @click="clearValue">
      <i class="bx bx-x"></i>
    </button>

    <div class="combobox--list" v-if="isShowList">
      <div class="not-found" v-if="isShowNotFound">
        {{ this.$ExerciseList.NotFoundData }}
      </div>
      <div
        class="combobox-item"
        v-for="item in renderList"
        :key="item.id"
        :style="
          item.id == selectedItem.id
            ? 'background-color: #ece7fe;color: #8a6bf6'
            : ''
        "
        @click="selectItem(item)"
      >
        <span>{{ item.value }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VCombobox",
  created() {},
  props: ["listData", "placeholder", "field"],
  data() {
    return {
      selectedItem: { value: "", id: "" },
      inputValue: "",
      renderList: [],
      isShowList: false,
      isShowNotFound: false,
      isSelected: false,
    };
  },
  methods: {
    clearValue() {
      this.selectedItem = { value: "", id: "" };
      this.inputValue = "";
      this.isSelected = false;
      this.$emitter.emit("clearValueCombobox", this.field);
    },
    selectItem(item) {
      this.selectedItem = item;
      this.inputValue = item.value;
      this.isSelected = true;
      this.$emitter.emit("selectItemCombobox", item, this.field);
    },
    showList() {
      this.isShowList = !this.isShowList;
      if (this.isShowList) {
        this.renderList = this.listData;
      }
      if (this.renderList.length == 0) {
        this.inputValue = this.selectedItem.value;
        this.isSelected = !this.inputValue == "";
      }
    },
    closeList() {
      this.isShowList = false;
      if (this.renderList.length == 0) {
        this.inputValue = this.selectedItem.value;
        this.isSelected = !this.inputValue == "";
      }
    },
  },
  watch: {
    inputValue: function () {
      this.renderList = this.listData.filter((item) =>
        item.value.toLowerCase().includes(this.inputValue.toLowerCase())
      );
      this.isShowNotFound = this.renderList.length == 0;
    },
    listData: function () {
      this.renderList = this.listData;
    },
  },
};
</script>

<style>
@import url("../css/main.css");
</style>
