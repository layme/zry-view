<template>
  <div>
    <Card dis-hover>
      <Form ref="houseSortForm" :model="houseSortDto" :rules="houseSortRules" :label-width="100" class="my-top full-top">
        <Spin size="large" fix v-if="loading" class="full-spin"></Spin>
        <Row :gutter="10">
          <Col :span="8">
            <FormItem label="房型分类名称" prop="houseName">
              <Input type="text" v-model.trim="houseSortDto.houseName" placeholder=""
                        clearable></Input>
            </FormItem>
          </Col>
          <template v-if="houseSortDto.bid">
            <Col :span="8">
              <FormItem label="当前状态">
                <Tag v-if="houseSortDto.isShow" color="success">在App端展示</Tag>
                <Tag v-else color="default">在App端隐藏</Tag>
              </FormItem>
            </Col>
            <Col :span="8" style="text-align: right">
              <Tooltip v-if="houseSortDto.isShow" class="my-tip" effect="dark" content="在App上隐藏" placement="top">
                <Button type="primary" shape="circle" icon="ios-appstore-outline"
                           @click="show(0)"></Button>
              </Tooltip>
              <Tooltip v-else class="my-tip" effect="dark" content="在App上展示" placement="top">
                <Button type="primary" shape="circle" icon="ios-appstore"
                           @click="show(1)"></Button>
              </Tooltip>
              <Button type="error" shape="circle" icon="md-trash" @click="remove"></Button>
            </Col>
          </template>
          <template v-else>
            <Col :span="16" style="text-align: right">
              <Button type="error" shape="circle" icon="md-trash" @click="remove"></Button>
            </Col>
          </template>
        </Row>
        <Row :gutter="10">
          <Col :span="16">
            <FormItem label="介绍" prop="houseTypeDesc">
              <Input type="textarea" v-model.trim="houseSortDto.houseTypeDesc" :rows="5" placeholder="" :maxlength="200"></Input>
            </FormItem>
          </Col>
        </Row>
        <FormItem style="margin-top: 20px">
          <Button v-if="houseSortDto.bid" type="warning" @click="validateForm('houseSortForm')">修 改</Button>
          <Button v-else type="primary" @click="validateForm('houseSortForm')">保 存</Button>
          <Button class="my-btn" @click="resetForm('houseSortForm')">重 置</Button>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>

<script>
import { saveHouseSort, updateHouseSort } from '@/api/houseSort'

export default {
  name: 'houseSortCard',
  props: {
    projectBid: String,
    houseSort: Object,
    index: Number
  },
  data () {
    return {
      houseSortDto: {
        projectBid: this.projectBid,
        houseName: '',
        houseTypeDesc: '',
        isShow: ''
      },
      houseSortRules: {
        houseName: [
          { required: true, message: '请输入房型分类名称', trigger: 'blur' },
          { max: 15, message: '不能超过15个字符', trigger: 'blur' }
        ],
        houseTypeDesc: [
          { required: true, message: '请输入介绍', trigger: 'blur' },
          { max: 200, message: '不能超过200个字符', trigger: 'blur' }
        ]
      },
      loading: false
    }
  },
  methods: {
    validateForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.saveOrUpHouseSort()
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    remove () {
      this.$emit('remove', this.index)
    },
    saveOrUpHouseSort () {
      if (this.houseSortDto.bid) {
        this.updateHouseSort()
      } else {
        this.saveHouseSort()
      }
    },
    saveHouseSort () {
      this.loading = true
      saveHouseSort(this.houseSortDto).then(res => {
        this.$Message.success('保存成功')
        this.houseSortDto.bid = res.body
        this.$store.commit('upStep', 4)
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    updateHouseSort () {
      this.loading = true
      updateHouseSort(this.houseSortDto).then(() => {
        this.$Message.success('修改成功')
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    show (val) {
      this.$emit('show', this.houseSortDto.bid, val)
    },
    syncData () {
      if (Object.keys(this.houseSort).length) {
        this.houseSortDto.projectBid = this.projectBid
        this.houseSortDto.bid = this.houseSort.bid
        this.houseSortDto.houseName = this.houseSort.houseName
        this.houseSortDto.houseTypeDesc = this.houseSort.houseTypeDesc
        this.houseSortDto.isShow = this.houseSort.isShow
      }
    }
  },
  watch: {
    houseSort (newVal) {
      this.syncData()
    }
  },
  mounted () {
    this.syncData()
  }
}
</script>

<style scoped>
  .my-tip {
    margin: 4px;
  }
  .my-top {
    position: relative;
  }
  .my-btn {
    margin-left: 20px;
  }

  .full-top {
    position: relative;
    height: 100%;
  }

  .full-spin {
    height: 100%;
  }
</style>
