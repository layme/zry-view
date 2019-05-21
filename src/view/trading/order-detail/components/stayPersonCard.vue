<template>
  <div>
    <Card>
      <p slot="title">
        入住人信息
      </p>
      <Form ref="stayPersonForm" :model="stayPersonDto" :label-width="100">
        <div v-for="(item, index) in stayPersonDto.stayPersons" :key="index" class="con-stay">
          <div class="subscript-stay">
            回头客
          </div>
          <Row>
            <Col :span="22">
              <Row>
                <Col :span="8">
                  <FormItem label="姓名">
                    <Input type="text" v-model.trim="item.stayPersonName"></Input>
                  </FormItem>
                </Col>
                <Col :span="8">
                  <FormItem label="性别">
                    <RadioGroup v-model="item.sex">
                      <Radio label="1">男</Radio>
                      <Radio label="2">女</Radio>
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
                  <FormItem label="证件类型">
                    <Select v-model="item.cardType">
                      <Option v-for="card in cardTypeOptions" :value="card.value" :key="card.value">{{ card.label }}
                      </Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col :span="8">
                  <FormItem label="证件号">
                    <Input type="text" v-model.trim="item.cardNumber"></Input>
                  </FormItem>
                </Col>
                <Col :span="8">
                  <FormItem label="手机号">
                    <Input type="text" v-model.trim="item.phone"></Input>
                  </FormItem>
                </Col>
              </Row>
            </Col>
            <Col :span="2" class="other-col">
              <Tooltip content="查看客史详情" placement="left">
                <Button shape="circle" icon="ios-person" @click="openGuest(index)"></Button>
              </Tooltip>
            </Col>
          </Row>
        </div>
        <Button type="primary" class="my-btn">保 存</Button>
        <Button class="my-btn">重 置</Button>
        <Button type="primary" class="my-btn">客史记录</Button>
      </Form>
    </Card>
    <Modal
      v-model="visible"
      :title="title"
      width="60"
      footer-hide>
      <guest-tabs v-if="visible" @close="handleClose"></guest-tabs>
    </Modal>
  </div>
</template>
<script>
import guestTabs from '@/components/guest/guestTabs'

export default {
  name: 'stayPersonCard',
  props: {
    data: Object
  },
  components: {
    guestTabs
  },
  data () {
    return {
      stayPersonDto: {
        orderBid: '',
        stayPersons: [
          {
            bid: '',
            stayPersonName: '',
            sex: '',
            houseTypeName: '4人间',
            cardType: '',
            cardNumber: '',
            phone: ''
          }
        ]
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
      visible: false
    }
  },
  methods: {
    openGuest (index) {
      this.title = '客史详情 - ' + this.stayPersonDto.stayPersons[index].stayPersonName
      this.visible = true
    },
    handleClose () {
      this.visible = false
    }
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
