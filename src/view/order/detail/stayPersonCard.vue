<template>
  <Form ref="stayPersonForm" :model="stayPersonDto" :label-width="100">
    <div v-for="(item, index) in stayPersonDto.stayPersons" :key="index" class="con-stay">
      <div class="subscript-stay">
        回头客
      </div>
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
          <FormItem label="房型名称">
            <span>{{ item.houseTypeName }}</span>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col :span="8">
          <FormItem label="证件类型">
            <Select v-model="item.cardType">
              <Option v-for="card in cardTypeOptions" :value="card.value" :key="card.value">{{ card.label }}</Option>
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
      <Divider dashed/>
    </div>
    <FormItem>
      <Button>重 置</Button>
      <Button type="primary" style="margin-left: 20px">保 存</Button>
    </FormItem>
  </Form>
</template>
<script>
export default {
  name: 'stayPersonCard',
  props: {
    data: Object
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
            houseTypeName: '',
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
      ]
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
</style>
