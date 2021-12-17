<template>
  <div class="wrap">
    <p>Overview of students' Covid information</p>
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
import { getStudentCovidInformation } from "@/api/getData.js";
export default {
  data() {
    return {
      params: {
        major: null,
        vaccinated: null,
        infected: null,
        recovered: null,
        guid: null,
        page: 1
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
          key: "major",
          width: 170
        },
        {
          title: "Infected",
          key: "infected",
          width: 90
        },
        {
          title: "Recovered",
          key: "recovered",
          width: 100
        },
        {
          title: "Recovered Time",
          key: "recovered_time",
          width: 130
        },
        {
          title: "Vaccinated",
          key: "vaccinated"
        },
        {
          title: "Vaccinated Time",
          key: "vaccinated_time"
        },
        {
          title: "Application Result",
          key: "apply_result"
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
      this.pagination.current = 1;
      this.params.page = 1;
      this.params.vaccinated = value;
      this.loadData(this.params);
    },
    changeInfected(value) {
      this.pagination.current = 1;
      this.params.page = 1;
      this.params.infected = value;
      this.loadData(this.params);
    },
    changeRecovered(value) {
      this.pagination.current = 1;
      this.params.page = 1;
      this.params.recovered = value;
      this.loadData(this.params);
    },
    searchStudent(value) {
      this.pagination.current = 1;
      this.params.page = 1;
      this.params.guid = value;
      this.loadData(this.params);
    },
    changePage(page) {
      this.params.page = page;
      this.loadData(this.params);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
