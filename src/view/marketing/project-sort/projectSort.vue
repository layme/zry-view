<template>
  <div>
    <Row>
      <Button type="primary" @click="sort">还 原</Button>
    </Row>
    <Row>
      <draggable tag="div" v-model="list" :options="dragOptions">
        <transition-group type="transition" name="flip-list">
          <div class="list-group-item" v-for="item in list" :key="item.id">
            {{ item.id }} - {{ item.name }}
          </div>
        </transition-group>
      </draggable>
    </Row>
    <Row>
      <Button type="primary">保 存</Button>
    </Row>
  </div>
</template>
<script>
import draggable from 'vuedraggable'

export default {
  name: 'projectSort',
  order: 6,
  components: {
    draggable
  },
  data () {
    return {
      list: [
        {
          'name': 'CBD自如驿',
          'id': 60
        },
        {
          'name': '三里屯团结自如驿',
          'id': 70
        },
        {
          'name': '工体自如驿',
          'id': 80
        },
        {
          'name': '武汉大陆坊自如驿',
          'id': 90
        }
      ],
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
    sort () {
      this.list = this.list.sort((a, b) => a.id - b.id)
    }
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
