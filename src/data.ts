import { ChartDataset } from 'chart.js/auto'

const MINUTE = 60000
const reference = Date.now() - (25*MINUTE)
const ref1 = reference + (5*MINUTE)
const ref2 = reference + (10*MINUTE)
const ref3 = reference + (15*MINUTE)
const ref4 = reference + (20*MINUTE)
const ref5 = reference + (25*MINUTE)

export const lastUpdated = ref5

function rand(min:number, max:number) {
  return Math.floor(Math.random() * (max - min) + min)
}
export const servers = new Map<string, ChartDataset[]>
export const serverRots = new Map<string, number[]>

serverRots.set(
    'SIGNAL 23 6 KERNEL',
    [
        Date.now() - (5 * 60000),
        Date.now() - (15 * 60000)
    ]
)
servers.set(
    'SIGNAL 23 6 KERNEL',
    [
        {
            label: 'Players',
            data: [
                {
                    x: reference,
                    y: rand(20, 60)
                },
                {
                    x: ref1,
                    y: rand(20, 60)
                },
                {
                    x: ref2,
                    y: rand(20, 60)
                },
                {
                    x: ref3,
                    y: rand(20, 60)
                },
                {
                    x: ref4,
                    y: rand(20, 60)
                },
                {
                    x: ref5,
                    y: rand(20, 60)
                }
            ],
            fill: false,
            borderColor: '#0077aa',
            backgroundColor: '#04b4ff',
            tension: 0.2,
            pointRadius: 2
        },
        {
            label: 'Rot',
            data: [
                {
                    x: reference,
                    y: rand(0, 30)
                },
                {
                    x: ref1,
                    y: rand(0, 30)
                },
                {
                    x: ref2,
                    y: rand(0, 30)
                },
                {
                    x: ref3,
                    y: rand(0, 30)
                },
                {
                    x: ref4,
                    y: rand(0, 30)
                },
                {
                    x: ref5,
                    y: rand(20, 60)
                }
            ],
            fill: false,
            borderColor: '#aa5b00',
            backgroundColor: '#ff8800',
            tension: 0.2,
            pointRadius: 2
        },
    ]
)


servers.set(
    'SIGNAL 23 6 ALPHA',
    [
        {
            label: 'Players',
            data: [
                {
                    x: reference,
                    y: rand(20, 60)
                },
                {
                    x: ref1,
                    y: rand(20, 60)
                },
                {
                    x: ref2,
                    y: rand(20, 60)
                },
                {
                    x: ref3,
                    y: rand(20, 60)
                },
                {
                    x: ref4,
                    y: rand(20, 60)
                },
                {
                    x: ref5,
                    y: rand(20, 60)
                }
            ],
            fill: false,
            borderColor: '#0077aa',
            backgroundColor: '#04b4ff',
            tension: 0.2,
            pointRadius: 2
        },
        {
            label: 'Rot',
            data: [
                {
                    x: reference,
                    y: rand(0, 30)
                },
                {
                    x: ref1,
                    y: rand(0, 30)
                },
                {
                    x: ref2,
                    y: rand(0, 30)
                },
                {
                    x: ref3,
                    y: rand(0, 30)
                },
                {
                    x: ref4,
                    y: rand(0, 30)
                },
                {
                    x: ref5,
                    y: rand(20, 60)
                }
            ],
            fill: false,
            borderColor: '#aa5b00',
            backgroundColor: '#ff8800',
            tension: 0.2,
            pointRadius: 2
        },
    ]
)