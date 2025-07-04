import { Chart, ChartDataset, PluginOptionsByType, ChartType, Point } from 'chart.js/auto'
import 'chartjs-adapter-date-fns'
import { servers, lastUpdated } from './data.ts'
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
    set_chart_data(lineChart, value)
    let ply = value[0]
    let playerTally: number = 0
    for (const datakey in ply.data) {
        const point = <Point> ply.data[datakey]
        playerTally += point.y
    }
    charts.set(chartContainer, playerTally)
}

const sortedMap: Map<HTMLDivElement, number> = new Map(lodash.sortBy(Array.from(charts), [(entry:any) => -entry[1]]));

for (const [key, _] of sortedMap) {
    document.body.appendChild(key)
}

playerText.textContent = `${totalPlayers}`
rotText.textContent = `${totalRot}`

updatedText.textContent = `${Math.floor((Date.now() - lastUpdated) / 1000.0)} seconds ago`

function set_chart_data(canvasElement: HTMLCanvasElement | null, data: ChartDataset[]) {
    if (canvasElement == null) { 
        return
    }
    let ctx = canvasElement.getContext('2d')
    if (ctx == null) { 
        return
    }
    const myPlugins = <PluginOptionsByType<ChartType>> {
        tooltip: {
            // enabled: false,
            mode: 'index',
            intersect: false
        },
        legend: {
            labels: { color: '#dddddd' }
        }
    }
    totalPlayers += (<Point> data[0].data.at(-1)).y
    totalRot += (<Point> data[1].data.at(-1)).y
    let chart = new Chart(ctx, {
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

setInterval(refreshTimer, 200);
function refreshTimer(): void {
    updatedText.textContent = `${Math.floor((Date.now() - lastUpdated) / 1000.0)} seconds ago`
    if (Math.floor((Date.now() - lastUpdated) / 1000.0) > 400) {
        refreshText.style.display = 'inline';
    } else {
        refreshText.style.display = 'none';
    }
}