<template>

  <div class="wrap">
    <p class="page-top-info">Make an application
      <router-link to="/apply">back</router-link>
    </p>
      <Row class="content-wrap" type="flex" justify="center">
    <Col class="form-wrap">
       <Form ref="formData" :model="formData" :rules="ruleValidate" :label-width="80">
       
        <Form-item label="Name:">
            <span>{{userInfo.name}}</span>
        </Form-item>
        <Form-item label="GUID:">
            <span>{{userInfo.guid}}</span>
        </Form-item>
        <Form-item label="Major:">
            <span v-if="userInfo.major==1" >Software Development</span>
            <span v-if="userInfo.major==2" >Information Technology</span>
            <span v-if="userInfo.major==3" >Cyber Security</span>
        </Form-item>
       <Form-item label="Infected:" prop="infected">
            <Radio-group v-model="formData.infected" @on-change="infectedStatusChange">
                <Radio label="1">Yes</Radio>
                <Radio label="0">No</Radio>
            </Radio-group>
        </Form-item>
        <Form-item v-if="showRecorvered" label="Recovered:" prop="recovered" >
            <Radio-group v-model="formData.recovered" @on-change="recoveredStatusChange">
                <Radio label="1">Yes</Radio>
                <Radio label="0">No</Radio>
            </Radio-group>
        </Form-item>

        <Form-item v-if="showRecorveredDate&&showRecorvered" label="Recovered Date:" prop="recoveredDate">
            <Form-item >
                <Date-picker type="date"  placeholder="Recovered Date" v-model="formData.recoveredDate"></Date-picker>
              </Form-item>
        </Form-item>

         <Form-item label="Vaccinated:" prop="vaccinated">
            <Radio-group v-model="formData.vaccinated" @on-change="vaccinatedStatusChange">
                <Radio label="1"><span>Yes</span></Radio>
                <Radio label="0"><span>No</span></Radio>
            </Radio-group>
        </Form-item>

        <Form-item v-if="showVaccinatedDate" label="Vaccinated Date:" prop="vaccinatedDate">
            <Form-item>
                <Date-picker type="date"  placeholder="Vaccinated Date" v-model="formData.vaccinatedDate"></Date-picker>
              </Form-item>
        </Form-item>

        

        
        <Form-item>
            <Button type="primary" @click="handleSubmit('formData')">Submit</Button>
            <Button  @click="handleReset('formData')" style="margin-left: 8px">Reset</Button>
        </Form-item>
    </Form>
    </Col>
    </Row>
  </div>
</template>

<script>
import { apply } from "@/api/getData.js";
export default {
  data() {
    return {
      userInfo: JSON.parse(localStorage.getItem("userInfo")),
      formData: {
        name: "Yue Zhao",
        gucid: "",
        major: "",
        vaccinated: "",
        infected: ""
      },
      showRecorvered: false,
      showRecorveredDate: false,
      showVaccinatedDate: false,
      ruleValidate: {
        name: [
          { required: true, message: "Name cannot be empty", trigger: "blur" }
        ],
        guid: [
          { required: true, message: "GUICD cannot be empty", trigger: "blur" }
        ],
        major: [
          {
            required: true,
            message: "Plsese select a major",
            trigger: "change"
          }
        ],
        vaccinated: [
          {
            required: true,
            message: "Please select whether you have been vaccinated",
            trigger: "change"
          }
        ],
        recovered: [
          {
            required: true,
            message: "Please select whether you have been recovered",
            trigger: "change"
          }
        ],
        recoveredDate: [
          {
            required: true,
            type: "date",
            message: "Please select the date that you recovered",
            trigger: "change"
          }
        ],
        vaccinatedDate: [
          {
            required: true,
            type: "date",
            message: "Please select the date that you vaccinated",
            trigger: "change"
          }
        ],
        infected: [
          {
            required: true,
            message: "Please select whether you have been infected",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    infectedStatusChange(value) {
      value == "1"
        ? (this.showRecorvered = true)
        : (this.showRecorvered = false);
    },
    recoveredStatusChange(value) {
      value == "1"
        ? (this.showRecorveredDate = true)
        : (this.showRecorveredDate = false);
    },
    vaccinatedStatusChange(value) {
      value == "1"
        ? (this.showVaccinatedDate = true)
        : (this.showVaccinatedDate = false);
    },
    dateFormat(date) {
      const Dates = date;
      const Y = Dates.getFullYear();
      const M = Dates.getMonth() + 1;
      const D = Dates.getDate();
      const times = Y + (M < 10 ? "-0" : "-") + M + (D < 10 ? "-0" : "-") + D;
      return times;
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let vaccinatedDate = null;
          let recoveredDate = null;
          let recovered = null;

          if (this.formData.vaccinatedDate) {
            vaccinatedDate = this.dateFormat(this.formData.vaccinatedDate);
          }
          if (this.formData.recoveredDate) {
            recoveredDate = this.dateFormat(this.formData.recoveredDate);
          }
          // console.log(vaccinatedDate);
          const params = {
            cid: this.userInfo.cid,
            infected: this.formData.infected,
            recovered: this.formData.recovered ? this.formData.recovered : null,
            vaccinated: this.formData.vaccinated,
            recoveredDate: recoveredDate,
            vaccinatedDate: vaccinatedDate
          };
          // console.log(params);
          apply(params).then(res => {
            const data = res.data;
            //when apply successfully
            if (data.status == 200) {
              this.$Message.success(data.msg);
              this.$router.replace("/apply");
            } else {
              this.$Message.error(data.msg);
            }
          });
        } else {
          this.$Message.error("Form validation failed!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
