const mongoose = require('mongoose');

module.exports = mongoose.model('Simulation3d', new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    author: {
        type: String,
        required: true
    },
    // resolution: {
    //     type: Number,
    //     required: true
    // },
    // charts: [Object],
    productions: [
        {
            GeometryList: [Object],
            SourcesList: [Object],
            content: String,
            create_date: {
                type: Date,
                default: Date.now
            },
        }],
    scene_design: {
        type: String,
        required: true
    },
    scene_simulation: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    default_material: {
        type: Number,
        required: true
    },
    create_date: {
        type: Date,
        default: Date.now
    },
    // until: {
    //     type: Number,
    //     required: true
    // },
    geometries: [Object],
    sources: [
        {
            // width: {
            //     type: Number,
            //     required: true
            // },
            // height: {
            //     type: Number,
            //     required: true
            // },
            // radius: {
            //     type: Number,
            //     required: true
            // },
            // token: {
            //     type: String,
            //     required: true
            // },
            // frequency: {
            //     type: Number,
            //     required: true
            // },
            waveLength: {
                type: Number,
                required: true
            },
            // integrated: {
            //     type: Number,
            //     required: true
            // },
            waveWidth: {
                type: Number,
                required: true
            },
            // sourcePosition: [Number]
            // component: {
            //     type: String,
            //     required: true
            // },
            // fwidth: {
            //     type: String,
            //     required: true
            // },
            // waveSize: [
            //     {
            //         type: Number,
            //         required: true
            //     }
            // ],
            // name: {
            //     type: String,
            //     required: true
            // },
            // fill: {
            //     type: String,
            //     required: true
            // },
            // sourceType: {
            //     type: String,
            //     required: true
            // },
            // class: {
            //     type: String,
            //     required: true
            // },
            // shape: {
            //     type: String,
            //     required: true
            // },
            x: {
                type: Number,
                required: true
            },
            y: {
                type: Number,
                required: true
            },
            z: {
                type: Number,
                required: true
            },
            // posX: {
            //     type: Number,
            //     required: true
            // },
            // posY: {
            //     type: Number,
            //     required: true
            // }
        }
    ],
    // coordinates: {
    //     x: {
    //         type: Number,
    //         required: true
    //     },
    //     y: {
    //         type: Number,
    //         required: true
    //     },
    //     z: {
    //         type: Number,
    //         required: true
    //     }
    // },
    // flux: [Object],
    // plotOptions: {
    //     generateAxis: {
    //         type: Number,
    //         default: 1
    //     },
    //     generateVideo: {
    //         type: Number,
    //         default: 1
    //     },
    //     generateDielectric: {
    //         type: Number,
    //         default: 1
    //     },
    //     until: {
    //         type: Number,
    //         required: true
    //     },
    //     plotAxis: {
    //         type: String,
    //         default: "Ez"
    //     },
    //     realtime: {
    //         type: Number,
    //         default: 0
    //     },
    //     labels: {
    //         type: Number,
    //         default: 0
    //     },
    //     field_parameters: {
    //         interpolation: {
    //             type: String,
    //             default: "spline36"
    //         },
    //         alpha: {
    //             type: Number,
    //             default: 1
    //         },
    //         cmap: {
    //             type: String,
    //             default: "RdBu"
    //         }
    //     },
    //     monitor_parameters: {
    //         alpha: {
    //             type: Number,
    //             default: 1
    //         },
    //         color: {
    //             type: String,
    //             default: "g"
    //         },
    //         facecolor: {
    //             type: String,
    //             default: "none"
    //         },
    //         edgecolor: {
    //             type: String,
    //             default: "r"
    //         },
    //         linewidth: {
    //             type: Number,
    //             default: 1
    //         },
    //         hatch: {
    //             type: String,
    //             default: "o"
    //         },
    //         label_color: {
    //             type: String,
    //             default: "g"
    //         },
    //         label_alpha: {
    //             type: Number,
    //             default: 0.3
    //         },
    //         offset: {
    //             type: Number,
    //             default: 20
    //         }
    //     },
    //     source_parameters: {
    //         color: {
    //             type: String,
    //             default: "r"
    //         },
    //         alpha: {
    //             type: Number,
    //             default: 1
    //         },
    //         facecolor: {
    //             type: String,
    //             default: "none"
    //         },
    //         edgecolor: {
    //             type: String,
    //             default: "r"
    //         },
    //         linewidth: {
    //             type: Number,
    //             default: 1
    //         },
    //         hatch: {
    //             type: String,
    //             default: ""
    //         },
    //         label_color: {
    //             type: String,
    //             default: "r"
    //         },
    //         label_alpha: {
    //             type: Number,
    //             default: 0
    //         },
    //         offset: {
    //             type: Number,
    //             default: 20
    //         }
    //     },
    //     plotViews: {
    //         eps_flag: {
    //             type: Number,
    //             default: 0
    //         },
    //         sources_flag: {
    //             type: Number,
    //             default: 0
    //         },
    //         monitor_flag: {
    //             type: Number,
    //             default: 0
    //         },
    //         boundaries_flag: {
    //             type: Number,
    //             default: 0
    //         }
    //     },
    //     boundary_parameters: {
    //         alpha: {
    //             type: Number,
    //             default: 1
    //         },
    //         facecolor: {
    //             type: String,
    //             default: "g"
    //         },
    //         edgecolor: {
    //             type: String,
    //             default: "g"
    //         },
    //         linewidth: {
    //             type: Number,
    //             default: 1
    //         },
    //         hatch: {
    //             type: String,
    //             default: ""
    //         }
    //     },
    //     eps_parameters: {
    //         alpha: {
    //             type: Number,
    //             default: 1
    //         },
    //         interpolation: {
    //             type: String,
    //             default: "spline36"
    //         },
    //         cmap: {
    //             type: String,
    //             default: "binary"
    //         }
    //     },
    // }
}));
