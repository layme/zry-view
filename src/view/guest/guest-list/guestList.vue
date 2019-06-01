<template>
  <div>
    <Form :model="guestDto" :label-width="80">
      <Row :gutter="20">
        <Col :span="8">
          <FormItem label="姓名">
            <Input v-model.trim="guestDto.name" placeholder="" clearable></Input>
          </FormItem>
        </Col>
        <Col :span="8">
          <FormItem label="证件号码">
            <Input v-model.trim="guestDto.idNumber" placeholder="" clearable></Input>
          </FormItem>
        </Col>
        <Col :span="8">
          <FormItem label="手机号">
            <Input v-model.trim="guestDto.mobile" placeholder="" clearable></Input>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="20">
        <Col :span="8">
          <FormItem label="特殊用户">
            <Select v-model="guestDto.isBlack" placeholder="" clearable>
              <Option
                v-for="item in isBlackOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col :span="12">
          <Button type="primary" icon="el-icon-search" @click="listGuest"> 查 询</Button>
        </Col>
      </Row>
    </Form>
    <Table stripe :columns="columns" :data="guestList" :loading="loadingTable" class="my-table">
      <template slot-scope="{ row }" slot="gender">
        <div>{{ row.gender | genderFilter }}</div>
      </template>
      <template slot-scope="{ row }" slot="lastCheckIn">
        <div>{{ row.lastCheckIn | dateFilter }}</div>
      </template>
      <template slot-scope="{ row }" slot="isBlack">
        <div>{{ row.isBlack | isBlackFilter }}</div>
      </template>
      <template slot-scope="{ row }" slot="action">
        <a @click="openGuest(row)">查看详情</a>
      </template>
    </Table>
    <Page class="my-page" :total="total" show-total :current.sync="guestDto.page"
          :page-size="guestDto.limit" @on-change="handlePageChange"/>
    <Modal
      v-model="visible"
      :title="title"
      width="800"
      footer-hide>
      <guest-tabs v-if="visible" :idNumber="idNumber" @close="handleClose"></guest-tabs>
    </Modal>
  </div>
</template>
<script>
import { getDate } from '@/libs/tools'
import { getGuests } from '@/api/guest'
import guestTabs from '@/components/guest/guestTabs'

export default {
  name: 'guestList',
  components: {
    guestTabs
  },
  data: function () {
    return {
      isBlackOptions: [
        {
          label: '是',
          value: 1
        },
        {
          label: '否',
          value: 0
        }
      ],
      guestDto: {
        name: '',
        idNumber: '',
        mobile: '',
        isBlack: '',
        pageIndex: 1,
        pageSize: 10
      },
      loadingTable: false,
      total: 0,
      guestList: [
        {
          'fid': '7337f99d0f3d11e9be1200ffe680200f',
          'name': '林子程',
          'gender': 2,
          'idType': 1,
          'idNumber': '35078219950626****',
          'birthplace': null,
          'birth': '1995-06-26',
          'idAddress': null,
          'mobile': '无',
          'checkInTimes': 2,
          'lastProjectName': '北京CBD自如驿',
          'lastCheckIn': 1501603200000,
          'isBlack': 0
        }, {
          'fid': '7338463c0f3d11e9be1200ffe680200f',
          'name': '时文浩',
          'gender': 2,
          'idType': 1,
          'idNumber': '37110219970405****',
          'birthplace': null,
          'birth': '1997-04-05',
          'idAddress': null,
          'mobile': '无',
          'checkInTimes': 1,
          'lastProjectName': '北京CBD自如驿',
          'lastCheckIn': 1501603200000,
          'isBlack': 0
        }
      ],
      columns: [
        {
          title: '序号',
          type: 'index',
          width: 60
        },
        {
          title: '姓名',
          key: 'name'
        },
        {
          title: '性别',
          slot: 'gender'
        },
        {
          title: '证件号',
          key: 'idNumber'
        },
        {
          title: '手机号',
          key: 'mobile'
        },
        {
          title: '生日',
          key: 'birth'
        },
        {
          title: '入住次数',
          key: 'checkInTimes'
        },
        {
          title: '最近入住',
          slot: 'lastCheckIn'
        },
        {
          title: '是否特殊用户',
          slot: 'isBlack'
        },
        {
          title: '操作',
          slot: 'action'
        }
      ],
      visible: false,
      title: '',
      idNumber: ''
    }
  },
  methods: {
    // 查询列表
    listGuest () {
      getGuests(this.guestDto).then(res => {
        if (res.code === 200) {
          this.guestList = res.data.rows
          this.total = res.data.total
        } else {
          this.$Message.warning('查询失败，请稍后重试')
        }
      })
    },
    handlePageChange () {
      console.info('guestDto', this.guestDto)
    },
    openGuest (row) {
      this.title = `客史详情 - ${row.stayPersonName}`
      this.idNumber = row.idNumber
      this.visible = true
    },
    handleClose () {
      this.visible = false
    }
  },
  filters: {
    genderFilter (val) {
      return val === 2 ? '男' : val === 1 ? '女' : '未知'
    },
    isBlackFilter (val) {
      return val === 1 ? '特殊用户' : '正常用户'
    },
    dateFilter (val) {
      return getDate(val, 'date')
    }
  },
  created () {
    this.listGuest()
  }
}
</script>
<style lang="less" scoped>
  .my-table {
    margin-top: 20px
  }

  .my-page {
    text-align: right;
    margin-top: 20px
  }
</style>
