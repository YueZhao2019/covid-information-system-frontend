<template>
  <div class="wrap">
    <p class="page-top-info">Apply for admission and accommodation
    </p>
    <Row class="content-wrap" type="flex" justify="center">
      <Col>
      <p>Have Applied?    
        <Radio-group v-model="checkApply">
        <Radio disabled label="yes"></Radio>
        <Radio disabled label="no"></Radio>
 
      </Radio-group>
    </p>
      <p>Make an application 
        <router-link to="/applyMake">here</router-link>
      </p>

      <div v-if="applyResult != 0">
      <p>Apply Result    
        <Radio-group v-model="applyResult">
        <Radio disabled label="1">
          <span>Agree</span>
        </Radio>
        <Radio disabled label="2">
          <span>disagree</span>
        </Radio>
        <Radio disabled label="3">
          <span>Wait for the result</span>
        </Radio>
 
      </Radio-group>
      </p>
    </div>
    

      </Col>
  </Row>
  </div>
</template>

<script>
import { getCovidInfo } from "@/api/getData.js";
export default {
  data() {
    return {
      userInfo: JSON.parse(localStorage.getItem("userInfo")),
      checkApply: "no",
      result: "Wait for the result",
      applyResult: -1
    };
  },
  mounted: function() {
    this.loadData();
  },
  methods: {
    loadData() {
      const params = {
        cid: this.userInfo.cid
      };
      getCovidInfo(params).then(res => {
        const data = res.data;
        this.applyResult = data.apply_result;

        if (this.applyResult == 0) this.checkApply = "no";
        else {
          this.checkApply = "yes";
        }
        if (this.applyResult == 1) this.applyResult = "1";
        if (this.applyResult == 2) this.applyResult = "2";
        if (this.applyResult == 3) this.applyResult = "3";
      });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
