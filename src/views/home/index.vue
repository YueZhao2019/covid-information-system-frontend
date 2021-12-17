<template>

  <div class="wrap">
    <p class="page-top-info">Personal Information
    </p>
      <Row class="content-wrap" type="flex" justify="center">
    <Col class="form-wrap">
       <Form ref="formData" :model="formData"  :label-width="80">
       
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
        <Form-item label="Profile:">
            <p>{{profile?profile:'( There is no profile at present. You can click the button to add it )'}}</p>
        </Form-item>
        
        <Form-item>
            <Button type="primary" @click="modal1 = true">Edit Profile</Button>
            
        </Form-item>
    </Form>
     <Modal
        v-model="modal1"
        title="Profile Edit"
        @on-ok="ok"
        @on-cancel="cancel">
        <Input v-model="profile" type="textarea" :rows="4" placeholder="Plase enter your profile..."></Input>
    </Modal>
    </Col>
    </Row>
  </div>
</template>

<script>
import { editProfile, getCovidInfo } from "@/api/getData.js";

export default {
  inject: ["reload"],
  data() {
    return {
      userInfo: JSON.parse(localStorage.getItem("userInfo")),
      formData: {
        name: "Yue Zhao",
        gucid: "",
        major: "",
        profile: ""
      },
      profile: "",
      modal1: false
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
        this.profile = data.profile;
      });
    },
    ok() {
      const params = {
        cid: this.userInfo.cid,
        profile: this.profile
      };
      // console.log(params);
      editProfile(params).then(res => {
        const data = res.data;
        //when edit successfully
        if (data.status == 200) {
          this.loadData(this.params);
          this.$Message.success("Edit successfully!");
        } else {
          this.$Message.error("Edit failed");
        }
      });
      this.reload();
    },
    cancel() {}
  }
};
</script>
<style lang="scss" scoped>
</style>
