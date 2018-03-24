// components/dgd-weui/dgd-steps/dgd-steps.js
Component({
  relations: {
    './dgd-step/dgd-step': {
      type: 'child'
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {
    current: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  },

  // 在组件布局完成后执行
  ready() {
    let nodes = this.getRelationNodes('./dgd-step/dgd-step');
    nodes.forEach((node, index) => {
      if (index < this.properties.current) {
        node.finish();
      }
      if (index === this.properties.current) {
        node.toDo();
      }
    });
  }
})
