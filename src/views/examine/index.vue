<template>
  <div class="wrap">
    <p>Examine of students' Covid information</p>
    <div>
      <Select clearable style="width:200px;margin:5px 10px;" placeholder="Select major" @on-change="changeMajor"> 
        <Option v-for="item in majorList" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>
      
    <Select  clearable style="width:150px;margin:5px 10px;" placeholder="Infected or not"  @on-change="changeInfected">
        <Option v-for="item in infectedList" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>
    <Select  clearable style="width:150px;margin:5px 10px;" placeholder="Recovered or not" @on-change="changeRecovered">
        <Option v-for="item in recoveredList" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>
    <Select clearable  style="width:150px;margin:5px 10px;" placeholder="Vaccinated or not" @on-change="changeVaccinated"> 
        <Option v-for="item in vaccinatedList" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>
    <Input style="width:200px;margin:5px 10px;" search  placeholder="Search student by GUID " @on-search="searchStudent" /> 
        <Table stripe :columns="columns" :data="studentList"></Table>
  

    <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
            <Page show-total :page-size=5 :total="pagination.total" :current.sync="pagination.current" @on-change="changePage"></Page>
        </div>
    </div>
    </div>
  </div>
</template>

<script>
import { getStudentCovidInformation, examine } from "@/api/getData.js";
export default {
  data() {
    return {
      params: {
        major: null,
        vaccinated: null,
        infected: null,
        recovered: null,
        page: 1,
        mode: 1 //show students who applied
      },
      pagination: {
        current: 1,
        total: 0
      },
      studentList: [],
      majorList: [
        {
          value: "1",
          label: "Software Development"
        },
        {
          value: "2",
          label: "Information Technology"
        },
        {
          value: "3",
          label: "IT Cyber Security"
        }
      ],
      vaccinatedList: [
        {
          value: "1",
          label: "Vaccinated"
        },
        {
          value: "0",
          label: "Unvaccinated"
        }
      ],
      infectedList: [
        {
          value: "1",
          label: "Infected"
        },
        {
          value: "0",
          label: "Uninfected"
        }
      ],
      recoveredList: [
        {
          value: "1",
          label: "Recovered"
        },
        {
          value: "0",
          label: "Unrecovered"
        }
      ],
      columns: [
        {
          title: "Name",
          key: "name",
          width: 130
        },
        {
          title: "GUID",
          key: "guid",
          width: 100
        },
        {
          title: "Major",
          key: "major"
        },
        {
          title: "Infected",
          key: "infected",
          width: 100
        },
        {
          title: "Recovered",
          key: "recovered",
          width: 120
        },
        {
          title: "Vaccinated",
          key: "vaccinated",
          width: 120
        },
        {
          title: "Application Result",
          key: "apply_result"
        },
        {
          title: "Action",
          key: "action",
          width: 220,
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.approve(params.row);
                    }
                  }
                },
                "Approve"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.reject(params.row);
                    }
                  }
                },
                "Reject"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "warning",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.wait(params.row);
                    }
                  }
                },
                "Wait"
              )
            ]);
          }
        }
      ]
    };
  },
  mounted: function() {
    this.loadData(this.params);
  },
  methods: {
    loadData(params) {
      getStudentCovidInformation(params).then(res => {
        const data = res.data;
        const list = data.list;
        let studentList = list;
        // console.log(data);
        studentList.map((item, index) => {
          switch (item.major) {
            case 1:
              item.major = "Software Development";
              break;
            case 2:
              item.major = "Information Technology";
              break;
            case 3:
              item.major = "IT Cyber Security";
              break;
          }
          item.vaccinated = this.changeTFtoYN(item.vaccinated);
          item.infected = this.changeTFtoYN(item.infected);
          item.recovered = this.changeTFtoYN(item.recovered);
          switch (item.apply_result) {
            case 1:
              item.apply_result = "✅";
              break;
            case 2:
              item.apply_result = "❌";
              break;
            case 3:
              item.apply_result = "⭕️";
              break;
            default:
              item.apply_result = "Haven't Apply";
          }
          if (!item.recovered_time) item.recovered_time = "~";
          if (!item.vaccinated_time) item.vaccinated_time = "~";
        });
        this.studentList = studentList;
        this.pagination.total = data.total;
      });
    },
    changeTFtoYN(value) {
      if (value != null) {
        value == true ? (value = "Yes") : (value = "No");
      } else {
        value = "~";
      }
      return value;
    },
    changeMajor(value) {
      this.pagination.current = 1;
      this.params.page = 1;
      this.params.major = value;
      this.loadData(this.params);
      // console.log(this.pagination.current);
    },
    changeVaccinated(value) {
      this.resetPagination();
      this.params.vaccinated = value;
      this.loadData(this.params);
    },
    changeInfected(value) {
      this.resetPagination();
      this.params.infected = value;
      this.loadData(this.params);
    },
    changeRecovered(value) {
      this.resetPagination();
      this.params.recovered = value;
      this.loadData(this.params);
    },
    searchStudent(value) {
      this.resetPagination();
      this.params.guid = value;
      this.loadData(this.params);
    },
    changePage(page) {
      this.params.page = page;
      this.loadData(this.params);
    },
    resetPagination() {
      this.pagination.current = 1;
      this.params.page = 1;
    },
    approve(item) {
      this.$Modal.confirm({
        title: "Approve Check",
        content: `Do you want to approve the applicaiton?<p>Student Name:&nbsp;&nbsp;&nbsp;&nbsp;${
          item.name
        }</p><p>Student GUID:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${item.guid}</p>`,
        onOk: () => {
          const params = {
            cid: item.id,
            result: 1
          };
          examine(params).then(res => {
            const data = res.data;
            //when apply successfully
            if (data.status == 200) {
              this.loadData(this.params);
              this.$Message.success("Apprve successfully!");
            } else {
              this.$Message.error("Approve failed");
            }
          });
        }
      });
    },
    reject(item) {
      this.$Modal.confirm({
        title: "Reject Check",
        content: `Do you want to reject the applicaiton?<p>Student Name:&nbsp;&nbsp;&nbsp;&nbsp;${
          item.name
        }</p><p>Student GUID:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${item.guid}</p>`,
        onOk: () => {
          const params = {
            cid: item.id,
            result: 2
          };
          examine(params).then(res => {
            const data = res.data;
            //when apply successfully
            if (data.status == 200) {
              this.loadData(this.params);
              this.$Message.success("Reject successfully!");
            } else {
              this.$Message.error("Reject failed");
            }
          });
        }
      });
    },
    wait(item) {
      this.$Modal.confirm({
        title: "Wait Check",
        content: `Do you want to wait the applicaiton?<p>Student Name:&nbsp;&nbsp;&nbsp;&nbsp;${
          item.name
        }</p><p>Student GUID:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${item.guid}</p>`,
        onOk: () => {
          const params = {
            cid: item.id,
            result: 3
          };
          examine(params).then(res => {
            const data = res.data;
            //when apply successfully
            if (data.status == 200) {
              this.loadData(this.params);
              this.$Message.success("Wait successfully!");
            } else {
              this.$Message.error("Wait failed");
            }
          });
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
