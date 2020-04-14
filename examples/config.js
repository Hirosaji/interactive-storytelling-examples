var config = {
    style: 'mapbox://styles/hirosaji/ck8y5lf8x0vrt1ip5kt4szoi4',
    accessToken: 'pk.eyJ1IjoiaGlyb3NhamkiLCJhIjoiY2szOWlqZWNzMDJueTNjcWhyNjhqdXBnOSJ9._6mJT202QqpnMuK-jvMr3g',
    showMarkers: false,
    theme: 'light',
    alignment: 'left',
    title: '東京都の犯罪統計 × Interactive Storytelling',
    subtitle: '- Crimes Story Map with Olympic and Hot Town -',
    byline: 'Hirosaji',
    footer: '出典: 警視庁 - 区市町村の町丁別、罪種別及び手口別認知件数（H31）, SUUMO - 住みたい街ランキング2020',
    chapters: [
        {
            id: 'main',
            title: 'まず、犯罪発生地域を地図に載せてみる',
            // image: './path/to/image/source.png',
            description: '犯罪の数の多さに合わせて地域を色／高さで表現して地図に載せました。新宿区や渋谷区などの繁華街の犯罪が群を抜いて多いのが見てとれます。',
            location: {
                center: [139.65269, 35.68924],
                zoom: 11.00,
                pitch: 60.00,
                bearing: -36.80
            },
            onChapterEnter: [
                {
                    layer: 'crime_total_3d',
                    opacity: 0.9
                }
            ],
            onChapterExit: [
                {
                    layer: 'crime_total_3d',
                    opacity: 0
                }
            ]
        },
        {
            id: 'page01',
            title: 'ここに五輪会場を載せる',
            // image: './path/to/image/source.png',
            description: '犯罪発生が少ない地域に五輪会場がプロットされているように見えます。（全犯罪：1〜300）',
            location: {
                center: [139.50469, 35.71926],
                zoom: 9.31,
                pitch: 0.00,
                bearing: -9.60
            },
            onChapterEnter: [
                {
                    layer: 'orinpic_plot',
                    opacity: 1
                },
                {
                    layer: 'crime_total',
                    opacity: 0.9
                }
            ],
            onChapterExit: [
                {
                    layer: 'orinpic_plot',
                    opacity: 0
                },
                {
                    layer: 'crime_total',
                    opacity: 0
                }
            ]
        },
        {
            id: 'page02',
            title: '五輪会場周辺の繁華街に注意',
            // image: './path/to/image/source.png',
            description: '日本はかなり治安が良いです。ただ、念のため五輪観戦の帰りの寄り道には注意するとよいかも。',
            location: {
                center: [139.73117, 35.69117],
                zoom: 12.04,
                pitch: 0.00,
                bearing: 0.00
            },
            onChapterEnter: [
                {
                    layer: 'orinpic_place',
                    opacity: 1
                },
                {
                    layer: 'crime_total',
                    opacity: 0.9
                }
            ],
            onChapterExit: [
                {
                    layer: 'orinpic_place',
                    opacity: 0
                },
                {
                    layer: 'crime_total',
                    opacity: 0
                }
            ]
        },
        {
            id: 'page03',
            title: '住みたい街ランキングも載せてみる',
            // image: './path/to/image/source.png',
            description: '住みたい街ランキング2020にランクインした街を載せてみました。これらの街も、犯罪発生率が少ない地域にプロットされているようです。',
            location: {
                center: [139.70666, 35.66718],
                zoom: 11.50,
                pitch: 0.00,
                bearing: 0.00
            },
            onChapterEnter: [
                {
                    layer: 'town_place',
                    opacity: 1
                },
                {
                    layer: 'crime_total',
                    opacity: 0.9
                }
            ],
            onChapterExit: [
                {
                    layer: 'town_place',
                    opacity: 0
                },
                {
                    layer: 'crime_total',
                    opacity: 0
                }
            ]
        },
        {
            id: 'page04',
            title: '全犯罪から空き巣等の犯罪を抽出する',
            // image: './path/to/image/source.png',
            description: '空き巣等の心配もなさそうです。（非侵入の窃盗：1〜30）',
            location: {
                center: [139.70666, 35.66718],
                zoom: 11.50,
                pitch: 0.00,
                bearing: 0.00
            },
            onChapterEnter: [
                {
                    layer: 'crime_sinnyu',
                    opacity: 0.9
                },
                {
                    layer: 'town_place',
                    opacity: 1
                }
            ],
            onChapterExit: [
                {
                    layer: 'crime_sinnyu',
                    opacity: 0
                },
                {
                    layer: 'town_place',
                    opacity: 0
                }
            ]
        }
    ]
};
