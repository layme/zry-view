<template>
  <div>
    <Card dis-hover>
      <p slot="title">
        入住人信息
      </p>
      <Form ref="stayPersonForm" :rules="rules" :model="stayPersonDto" :label-width="100">
        <div v-for="(item, index) in stayPersonDto.stayPersonList" :key="index" class="con-stay">
          <div class="subscript-stay" v-if="guestTypeFormat(item.bid)">
            {{ guestTypeFormat(item.bid) }}
          </div>
          <Row>
            <Col :span="22">
              <Row>
                <Col :span="8">
                  <FormItem label="姓名" prop="name">
                    <Input type="text" v-model.trim="item.name" placeholder="" clearable></Input>
                  </FormItem>
                </Col>
                <Col :span="8">
                  <FormItem label="性别" prop="sex">
                    <RadioGroup v-model="item.sex">
                      <Radio :label="1">男</Radio>
                      <Radio :label="2">女</Radio>
                    </RadioGroup>
                  </FormItem>
                </Col>
                <Col :span="8">
                  <FormItem label="入住房型">
                    <span>{{ item.houseTypeName }}</span>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col :span="8">
                  <FormItem label="证件类型" prop="credentialType">
                    <Select v-model="item.credentialType" placeholder="" transfer>
                      <Option v-for="card in cardTypeOptions" :value="card.value" :key="card.value">{{ card.label }}
                      </Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col :span="8">
                  <FormItem v-if="item.credentialType === 1" label="证件号"
                            :prop="'stayPersonList.' + index + '.credentialNumber'" :rules="[
                  { required: true, message: '请输入身份证号', trigger: 'blur' },
                  { pattern: /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|30|31)|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)$/,
                  message: '身份证号码格式不对', trigger: 'blur' }]">
                    <Input type="text" v-model.trim="item.credentialNumber" placeholder="" clearable></Input>
                  </FormItem>
                  <div>
                    <FormItem v-if="item.credentialType !== 1" label="证件号">
                      <Input type="text" v-model.trim="item.credentialNumber" placeholder="" clearable></Input>
                    </FormItem>
                  </div>
                </Col>
                <Col :span="8">
                  <FormItem label="手机号">
                    <Input type="text" v-model.trim="item.phone" placeholder="" clearable></Input>
                  </FormItem>
                </Col>
              </Row>
            </Col>
            <Col :span="2" class="other-col" v-if="item.guestFid">
              <Tooltip content="查看客史详情" placement="left">
                <Button shape="circle" icon="ios-person" @click="openGuest(index)"></Button>
              </Tooltip>
            </Col>
          </Row>
        </div>
        <Button v-if="orderStatus === 1 || orderStatus === 2" type="primary" class="my-btn" @click="validateForm">保 存</Button>
        <Button v-if="orderStatus === 2" type="primary" class="my-btn" ghost>客史记录</Button>
      </Form>
    </Card>
    <Modal
      v-model="visible"
      :title="title"
      width="800"
      footer-hide>
      <guest-tabs v-if="visible" :guest-fid="guestFid" :active="active" @close="handleClose"></guest-tabs>
    </Modal>
  </div>
</template>
<script>
import guestTabs from '@/components/guest/guestTabs'

export default {
  name: 'stayPersonCard',
  props: {
    stayList: {
      type: Array,
      default: () => []
    },
    guestType: Object,
    orderBid: String,
    orderStatus: Number
  },
  components: {
    guestTabs
  },
  data () {
    return {
      stayPersonDto: {
        orderId: '',
        stayPersonList: []
      },
      cardTypeOptions: [
        {
          label: '身份证',
          value: 1
        },
        {
          label: '护照',
          value: 2
        },
        {
          label: '其他',
          value: 0
        }
      ],
      title: '',
      visible: false,
      guestFid: '',
      active: 'record',
      rules: {}
    }
  },
  methods: {
    initData () {
      this.stayPersonDto.stayPersonList = []
      this.stayPersonDto.orderId = this.orderBid
      this.stayList.forEach(item => {
        this.stayPersonDto.stayPersonList.push({
          bid: item.bid,
          orderBid: this.orderBid,
          name: item.name,
          sex: item.sex,
          credentialType: item.credentialType,
          credentialNumber: item.credentialNumber,
          phone: item.phone,
          houseTypeName: item.houseTypeName
        })
      })
    },
    openGuest (index) {
      this.title = `客史详情 - ${this.stayPersonDto.stayPersons[index].name}`
      this.visible = true
      this.guestFid = this.stayPersonDto.stayPersons[index].guestFid
    },
    handleClose () {
      this.visible = false
    },
    guestTypeFormat (val) {
      return this.guestType[val]
    },
    validateForm () {
      this.$refs['stayPersonForm'].validate((valid) => {
        if (valid) {
          this.save()
        } else {
          return false
        }
      })
    },
    save () {
      this.$emit('save', this.stayPersonDto)
    }
  },
  watch: {
    data () {
      this.initData()
    }
  },
  created () {
    this.initData()
  }
}
</script>
<style lang="less" scoped>
  .name-input {
    width: ~"calc(100% - 70px)";
    margin-right: 10px;
  }

  .con-stay {
    position: relative;
    overflow: hidden;
    border: 1px #dcdee2 solid;
    border-radius: 4px;
    margin-bottom: 20px;
    padding: 20px 20px 0 0
  }

  .subscript-stay {
    color: #fff;
    height: 25px;
    width: 100px;
    position: absolute;
    left: -30px;
    top: 7px;
    text-align: center;
    line-height: 25px;
    background-color: #2db7f5;
    -moz-transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  .my-btn {
    margin-right: 20px;
  }

  .other-col {
    text-align: right;
  }
</style>
