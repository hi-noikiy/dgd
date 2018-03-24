// components/dgd-ui/dgd-supernatant/dgd-supernatant.js
Component({
    externalClasses: ['component-class'],
    properties: {
        to:{
            type:String
        },
        name: {
            type: String
        },
        classify: {
            type : String,
            value: 'default'
        },
        supernatantTitle: {
            type: String
        },
        supernatantInfo: {
            type: String
        },
        supernatantTips: {
            type: String
        }
    },
    methods:{
        handlSupernatant: function(e){
            if (!!this.properties.to){
                wx.navigateTo({
                    url: this.properties.to,
                })
            } else {
                this.triggerEvent('handlSupernatant', {
                    name: this.properties.name
                })
            }
        }
    }
})