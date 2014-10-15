// The raw data to observe
var stats = [
    { label: 'A', value: 100 },
    { label: 'B', value: 100 },
    { label: 'C', value: 100 },
    { label: 'D', value: 100 },
    { label: 'E', value: 100 },
    { label: 'F', value: 100 }
]

// A resusable polygon graph component
Vue.component('polygraph', {
    template: '#polygraph-template',
    replace: true,
    computed: {
        // a computed property for the polygon's points
        points: function () {
            var total = this.stats.length
            return this.stats.map(function (stat, i) {
                var point = valueToPoint(stat.value, i, total)
                return point.x + ',' + point.y
            }).join(' ')
        }
    },
    components: {
        // a sub component for the labels
        'axis-label': {
            computed: {
                point: function () {
                    return valueToPoint(+this.value + 10, this.$index, this.$parent.stats.length)
                },
                x: function () {
                    return this.point.x - 4
                },
                y: function () {
                    return this.point.y + 4
                }
            }
        }
    }
})

// math helper...
function valueToPoint (value, index, total) {
    var x     = 0,
        y     = -value * 0.8,
        angle = Math.PI * 2 / total * index,
        cos   = Math.cos(angle),
        sin   = Math.sin(angle),
        tx    = x * cos - y * sin + 100,
        ty    = x * sin + y * cos + 100
    return {
        x: tx,
        y: ty
    }
}

// bootstrap the demo
new Vue({
    el: '#demo',
    data: {
        newLabel: '',
        stats: stats
    },
    filters: {
        format: function (stats) {
            return JSON.stringify(stats, null, 2)
        }
    },
    methods: {
        add: function () {
            if (!this.newLabel) return
            this.stats.push({
                label: this.newLabel,
                value: 100
            })
            this.newLabel = ''
        },
        remove: function (stat) {
            if (this.stats.length > 3) {
                this.stats.$remove(stat.$data)
            }
        }
    }
})
