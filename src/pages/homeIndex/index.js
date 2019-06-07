import React from 'react';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import { Row,Col } from 'antd'
import './style.less'

export default class HomeIndex extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            echartsVisible:false
        }
    }

    componentDidMount() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echartsCon'));
        // 绘制图表
        myChart.setOption({
            noDataLoadingOption:
            {
                text: '暂无数据',
                effect: 'bubble',
                effectOption:
                {
                    effect:
                    {
                        n: 0
                    }
                }
            },
            title: { text: '' },
            tooltip: {},
            xAxis: {
                data: []
            },
            yAxis: {},
            series: [{
                name: '访问次数',
                type: 'bar',
                data: []
            }]
        });
    }

    render() {
        return (
            <div>
                <h2>近7日浏览次数</h2>
                <div id="chart">
                    <div id="nodata" style={{display:(!this.state.echartsVisible)? 'block' : 'none'}}>暂无数据</div>
                    <div id="echartsCon" style={{display:(this.state.echartsVisible)? 'block' : 'none'}}></div>
                </div>

                <Row id="articleModule">
                    <Col span={12}>
                        <div className="article pdr">
                            <div className="title">
                                热门文章
                            </div>
                            <div className="article-list">

                            </div>
                        </div>
                    </Col>

                    <Col span={12}>
                        <div className="article">
                            <div className="title">
                                最新发表
                            </div>
                            <div className="article-list">

                            </div>
                        </div>
                    </Col>
                </Row>
                
            </div>
            
        )
    }
}