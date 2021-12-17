<template>
  <div class="wrap">
    <p class="page-top-info">Add Users
      <!-- <router-link to="/home">back</router-link> -->
    </p>
      <Row class="content-wrap" type="flex" justify="center">
    <Col class="form-wrap">
       <Form ref="formData" :model="formData" :rules="rules" :label-width="80">
         <Form-item label="Username/guid" prop="username">
            <Input v-model="formData.username" placeholder="Please enter username/guid"></Input>
        </Form-item>
        <Form-item label="Password" prop="password">
            <Input v-model="formData.password" placeholder="Please enter password"></Input>
        </Form-item>
        <Form-item label="Name" prop="name">
            <Input v-model="formData.name" placeholder="Please enter name"></Input>
        </Form-item>
       
        <Form-item label="Major" prop="major">
            <Select v-model="formData.major" placeholder="Please select major">
                <Option value="1">Software Development</Option>
                <Option value="2">Information Technology</Option>
                <Option value="3">IT Cyber Security</Option>
            </Select>
        </Form-item>

        <FormItem label="Role" prop="role"> 
            <Radio-group v-model="formData.role">
              <Radio label="1">
              <span>Student</span>
            </Radio>
            <Radio label="2">
                <span>Teacher</span>
            </Radio>
            <Radio label="3">
                <span>Administartor</span>
            </Radio>
          </Radio-group>
   
          </FormItem>
       
       
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
import { addUser } from "@/api/getData.js";
export default {
  data() {
    return {
      formData: {
        username: "",
        password: "",
        name: "",
        major: "",
        role: ""
      },
      rules: {
        username: [
          {
            required: true,
            message: "Username/guid cannot be empty",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "Password cannot be empty",
            trigger: "blur"
          }
        ],
        name: [
          { required: true, message: "Name cannot be empty", trigger: "blur" }
        ],
        major: [
          {
            required: true,
            message: "Plsese select a major",
            trigger: "change"
          }
        ],
        role: [
          {
            required: true,
            message: "Please select the role",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          // get the data form form table
          const data = this.formData;
          const params = {
            username: data.username,
            password: data.password,
            role: parseInt(data.role),
            name: data.name,
            major: parseInt(data.major)
          };
          // console.log(params);
          addUser(params).then(res => {
            const data = res.data;
            // console.log(data);
            //Add user successfully
            if (data.status == 200) {
              this.$Message.success(data.msg);
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
