import { ChartDataset } from 'chart.js/auto'

const MINUTE = 60000
const reference = Date.now() - (5*MINUTE)
const ref1 = reference + rand(1000, (1*MINUTE))
const ref2 = reference + rand((1*MINUTE)+1000, (2*MINUTE))
const ref3 = reference + rand((2*MINUTE)+1000, (3*MINUTE))
const ref4 = reference + rand((3*MINUTE)+1000, (4*MINUTE))
const ref5 = reference + rand((4*MINUTE)+1000, (5*MINUTE))

export const lastUpdated = ref5

function rand(min:number, max:number) {
  return Math.floor(Math.random() * (max - min) + min)
}
export const servers = new Map<string, ChartDataset[]>

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