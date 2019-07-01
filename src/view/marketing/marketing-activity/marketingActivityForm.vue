<template>
  <Form ref="activityForm" :model="paramDto" :rules="activityRules" :label-width="75">
    <FormItem label="活动项目" prop="projectBid">
      <Select v-model="paramDto.projectBid" placeholder="">
        <Option
          v-for="item in $store.state.user.projectList"
          :key="item.bid"
          :label="item.projectName"
          :value="item.bid">
        </Option>
      </Select>
    </FormItem>
    <FormItem label="活动标题" prop="title">
      <Input v-model.trim="paramDto.title" placeholder="" clearable></Input>
    </FormItem>
    <FormItem label="副标题" prop="subTitle">
      <Input v-model.trim="paramDto.subTitle" placeholder="" clearable></Input>
    </FormItem>
    <FormItem label="活动日期" prop="dateRange">
      <DatePicker v-model="dateRange" type="daterange" split-panels placeholder=""
                  :editable="false" class="my-date-picker"></DatePicker>
    </FormItem>
    <FormItem label="活动链接" prop="jumpLink">
      <Input v-model.trim="paramDto.jumpLink" placeholder="" clearable></Input>
    </FormItem>
    <Row :gutter="20">
      <Col :span="12">
        <FormItem label="显示顺序" prop="imgIndex">
          <Input v-model.trim="paramDto.imgIndex" placeholder="" clearable></Input>
        </FormItem>
      </Col>
      <Col :span="12">
        <FormItem label="是否跳转" prop="isJump">
          <RadioGroup v-model="paramDto.isJump">
            <Radio :label="1">是</Radio>
            <Radio :label="0">否</Radio>
          </RadioGroup>
        </FormItem>
      </Col>
    </Row>
    <FormItem label="活动图片" prop="imgUrl">
      <Input v-show="false" v-model="paramDto.imgUrl" placeholder="" clearable></Input>
      <div class="demo-upload-list" v-for="(item, index) in uploadList" :key="index">
        <template v-if="item.status === 'finished'">
          <img :src="item.response ? item.response.body.attachmentImgUrl : item.url">
          <div class="demo-upload-list-cover">
            <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
          </div>
        </template>
        <template v-else>
          <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
        </template>
      </div>
      <Upload
        v-if="!uploadList.length"
        ref="upload"
        accept="image/*"
        type="drag"
        :headers="{ 'Authorization': $store.state.user.token }"
        :action="uploadPicUrl"
        :show-upload-list="false"
        :on-success="handleSuccess"
        :on-error="handleError"
        :max-size="200"
        :on-exceeded-size="handleMaxSize"
        style="display: inline-block; width: 46px;">
        <div style="width: 46px; line-height: 46px;">
          <Icon type="ios-camera" size="20"></Icon>
        </div>
      </Upload>
      <div v-if="!uploadList.length">图片大小不能超过 200KB</div>
    </FormItem>
  </Form>
</template>
<script>
import { getDate } from '@/libs/tools'
export default {
  name: 'marketingActivityForm',
  props: {
    activity: Object
  },
  data () {
    return {
      paramDto: {
        bid: '',
        projectBid: '',
        title: '',
        subTitle: '',
        startDate: '',
        endDate: '',
        jumpLink: '',
        imgIndex: '',
        isJump: '',
        imgUrl: ''
      },
      dateRange: [],
      uploadPicUrl: this.$store.state.app.baseUrl + '/system/upLoadImg.action',
      uploadList: [],
      activityRules: {
        projectBid: [
          { required: true, message: '请选择项目', trigger: 'change' }
        ],
        title: [
          { required: true, type: 'string', message: '请输入标题', trigger: 'blur' }
        ],
        subTitle: [
          { required: true, type: 'string', message: '请输入副标题', trigger: 'blur' }
        ],
        dateRange: [
          { required: true,
            type: 'array',
            fields: {
              0: { type: 'date', required: true, message: '请选择活动日期' },
              1: { type: 'date', required: true, message: '请选择活动日期' }
            },
            trigger: 'change' }
        ],
        jumpLink: [
          { required: true, type: 'string', message: '请输入活动链接', trigger: 'blur' }
        ],
        imgIndex: [
          { required: true, type: 'string', message: '请输入显示顺序', trigger: 'blur' }
        ],
        isJump: [
          { required: true, type: 'number', message: '请选择是否跳转', trigger: 'change' }
        ],
        imgUrl: [
          { required: true, message: '请上传活动图片', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    validForm () {
      this.$refs['activityForm'].validate((valid) => {
        if (valid) {
          this.$emit('submit', this.paramDto)
        } else {
          this.$emit('error')
        }
      })
    },
    handleMaxSize (file) {
      this.$Message.warning('文件大小超过了限制')
    },
    handleSuccess (response, file, fileList) {
      if (response.code !== 200) {
        this.$Message.error(response.message)
      } else {
        this.paramDto.imgUrl = response.body.attachmentImgUrl
        this.uploadList = this.$refs.upload.fileList
      }
    },
    handleError (err, file, fileList) {
      this.$Message.error('图片上传失败')
      console.info(err)
    },
    handleRemove (file) {
      if (this.$refs.upload) {
        const fileList = this.$refs.upload.fileList
        this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
      } else {
        this.uploadList.splice(0, 1)
      }
      this.paramDto.imgUrl = ''
    }
  },
  watch: {
    'dateRange' (val) {
      this.paramDto.startDate = val[0] ? getDate(val[0], 'date') : ''
      this.paramDto.endDate = val[1] ? getDate(val[1], 'date') : ''
    }
  },
  created () {
    if (Object.keys(this.activity).length) {
      this.paramDto.bid = this.activity.bid
      this.paramDto.projectBid = this.activity.projectBid
      this.paramDto.title = this.activity.title
      this.paramDto.subTitle = this.activity.subTitle
      this.dateRange.push(this.activity.startDate)
      this.dateRange.push(this.activity.endDate)
      this.paramDto.jumpLink = this.activity.jumpLink
      this.paramDto.imgIndex = this.activity.imgIndex.toString()
      this.paramDto.isJump = this.activity.isJump
      this.paramDto.imgUrl = this.activity.imgUrl
      this.uploadList.push({
        url: this.paramDto.imgUrl,
        status: 'finished'
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .my-date-picker {
    width: 100%;
  }
  .demo-upload-list {
    display: inline-block;
    width: 48px;
    height: 48px;
    text-align: center;
    line-height: 48px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
    margin-right: 4px;
  }

  .demo-upload-list img {
    width: 100%;
    height: 100%;
  }

  .demo-upload-list-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, .6);
  }

  .demo-upload-list:hover .demo-upload-list-cover {
    display: block;
  }

  .demo-upload-list-cover i {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
</style>
