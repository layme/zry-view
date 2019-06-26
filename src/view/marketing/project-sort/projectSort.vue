<template>
  <div>
    <Row>
      <Button type="primary" @click="reset">还 原</Button>
    </Row>
    <Row>
      <draggable tag="div" v-model="list" :options="dragOptions">
        <transition-group type="transition" name="flip-list">
          <div class="list-group-item" v-for="item in list" :key="item.projectBid">
            {{ item.projectName }}
          </div>
        </transition-group>
      </draggable>
    </Row>
    <Row>
      <Button type="primary" @click="saveProjectSort">保 存</Button>
    </Row>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
import { getProjectSortList, saveProjectSort } from '@/api/project'

export default {
  name: 'projectSort',
  order: 6,
  components: {
    draggable
  },
  data () {
    return {
      list: [],
      oldList: [],
      projectBidList: [],
      dropConClass: {
        left: ['drop-box', 'left-drop-box'],
        right: ['drop-box', 'right-drop-box']
      },
      options: {
        group: 'project',
        animation: 200,
        ghostClass: 'sortable-ghost',
        chosenClass: 'chosenClass',
        scroll: true,
        scrollSensitivity: 200
      }
    }
  },
  methods: {
    reset () {
      this.list = this.oldList
    },
    saveProjectSort () {
      this.projectBidList = this.list.map(item => item.projectBid)
      saveProjectSort({ projectIds: this.projectBidList.toString() }).then(res => {
        this.$Message.success('修改排序成功')
      }).catch(() => {
      })
    },
    getProjectSortList () {
      getProjectSortList().then(res => {
        this.list = res.body
        this.oldList = res.body
      }).catch(() => {
      })
    }
  },
  created () {
    this.getProjectSortList()
  },
  computed: {
    dragOptions () {
      return {
        group: 'project',
        disabled: false,
        animation: 0,
        ghostClass: 'ghost'
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .flip-list-move {
    transition: transform 0.1s;
  }

  .no-move {
    transition: transform 0s;
  }

  .ghost {
    opacity: 0.5;
    background: #c8ebfb;
  }

  .list-group-item {
    cursor: move;
    margin: 10px 0;
    padding: 15px;
    border: 1px solid #dcdee2;
    border-radius: 4px;
    width: 350px;
  }
</style>
