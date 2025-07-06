import { Chart, ChartDataset, PluginOptionsByType, ChartType, TooltipCallbacks, Point, Plugin, TooltipItem, ChartTypeRegistry } from 'chart.js/auto'
import 'chartjs-adapter-date-fns'
import { servers, serverRots, lastUpdated } from './data.ts'
import lodash from 'lodash'

// const lineChart = <HTMLCanvasElement | null> document.getElementById('lineChart')
// const lineChart2 = <HTMLCanvasElement | null> document.getElementById('lineChart2')
const updatedText = <HTMLTextAreaElement> document.getElementById('updatedAgo')
const refreshText = <HTMLTextAreaElement> document.getElementById('refreshBtn')
const playerText = <HTMLTextAreaElement> document.getElementById('currentPlayers')
const rotText = <HTMLTextAreaElement> document.getElementById('currentRot')

let totalPlayers: number = 0
let totalRot: number = 0

const charts: Map<HTMLDivElement, number> = new Map()

for (const [key, value] of servers) {
    const chartContainer = document.createElement("div")
    chartContainer.classList.add("chart-container")
    chartContainer.style.cssText = "margin-bottom: 72px; position: relative; height:40vh; width:80vw;"

    const serverTitle = document.createElement("h3")
    serverTitle.textContent = key
    serverTitle.style.cssText = "text-align: center;"
    chartContainer.appendChild(serverTitle)

    const lineChart = document.createElement("canvas")
    chartContainer.appendChild(lineChart)

    set_chart_data(lineChart, value, serverRots.get(key) || [])
    
    let ply = value[0]
    let playerTally: number = 0
    for (const datakey in ply.data) {
        const point = <Point> ply.data[datakey]
        playerTally += point.y
    }
    charts.set(chartContainer, playerTally)
}

const sortedMap: Map<HTMLDivElement, number> = new Map(lodash.sortBy(Array.from(charts), [(entry:any) => -entry[1]]))

for (const [key, _] of sortedMap) {
    document.body.appendChild(key)
}

playerText.textContent = `${totalPlayers}`
rotText.textContent = `${totalRot}`

updatedText.textContent = `${Math.floor((Date.now() - lastUpdated) / 1000.0)} seconds ago`

const lineMarker: Plugin<ChartType> = {
    id: 'rotmarker',
    beforeDatasetsDraw: (chart, args, plugins) => {
        const { ctx, chartArea: { top, bottom }, scales: { x } } = chart
        const positions: number[] = plugins.positions
        ctx.save()

        for (const positionKey in positions) {
            const position = positions[positionKey]
            ctx.beginPath()
            ctx.strokeStyle = 'brown'
            ctx.lineWidth = 5
            ctx.moveTo(x.getPixelForValue(position), top)
            ctx.lineTo(x.getPixelForValue(position), bottom)
            ctx.stroke()
        }   
    }
}
Chart.register(lineMarker)

function set_chart_data(canvasElement: HTMLCanvasElement | null, data: ChartDataset[], rotPositions: number[]) {
    if (canvasElement == null) { 
        return
    }
    let ctx = canvasElement.getContext('2d')
    if (ctx == null) { 
        return
    }
    const tooltipCallbacks = <TooltipCallbacks<ChartType>> {
        footer: function(contexts) {
            let footers: string[] = []
            for (const context of contexts) {
                if (rotPositions.includes(context.parsed.x)) {
                    footers.push("Rotted, server reset")
                    break
                }
            }
            return footers
        }
    }
    const myPlugins = <PluginOptionsByType<ChartType>> <unknown> {
        tooltip: {
            mode: 'index',
            intersect: false,
            footerColor: 'red',
            callbacks: tooltipCallbacks
        },
        legend: {
            labels: { color: '#dddddd' }
        },
        rotmarker: {
            positions: rotPositions,
        },
    }
    totalPlayers += (<Point> data[0].data.at(-1)).y
    totalRot += (<Point> data[1].data.at(-1)).y
    new Chart(ctx, {
        type: 'line',
        data: {
            datasets: data
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: myPlugins,
            animation: false,
            scales: {
                x: {
                    type: "time",
                    ticks: {
                        autoSkip: true,
                        maxTicksLimit: 10,
                        color: '#cccccc'
                    },
                    grid: { color: '#333333' },
                    suggestedMin: Date.now() - 86400000,
                    suggestedMax: Date.now(),
                },
                y: {
                    ticks: { color: '#cccccc' },
                    grid: { color: '#333333' },
                    suggestedMin: 0,
                    suggestedMax: 100,
                }
            },
            layout: {
                padding: 10,
            }
        }
    })
}

setInterval(refreshTimer, 200)
function refreshTimer(): void {
    updatedText.textContent = `${Math.floor((Date.now() - lastUpdated) / 1000.0)} seconds ago`
    if (Math.floor((Date.now() - lastUpdated) / 1000.0) > 400) {
        refreshText.style.display = 'inline'
    } else {
        refreshText.style.display = 'none'
    }
}