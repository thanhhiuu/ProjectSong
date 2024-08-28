/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';
import Charts from 'chart.js/auto';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../store-redux/actions/index';
import icons from '../ultil/icon';
import '@fontsource/roboto';
import { Link } from 'react-router-dom';
import path from '../ultil/path';

const Chart = ({ display }) => {
  const chartRef = useRef(null);
  const { zingcharts } = useSelector((state) => state.app);
  const [chart, setChart] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    // Destroy previous chart instance
    if (chart) {
      chart.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    const labels = zingcharts?.chart?.times
      ?.filter((e) => e.hour % 2 === 0)
      .map((item) => `${item.hour}:00`);

    const datasets = [];
    const artistsSong = [];
    for (let i = 0; i < 3; i++) {
      if (zingcharts?.chart?.items) {
        datasets.push(
          zingcharts?.chart?.items[Object.keys(zingcharts?.chart?.items)[i]]
            .filter((i) => i.hour % 2 === 0)
            ?.map((o) => o.counter)
        );
        const item = zingcharts?.items[Object.keys(zingcharts?.items)[i]];
        artistsSong.push(Array.isArray(item) ? item[0] : item);
      }
    }

    const myChart = new Charts(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: datasets.map((data, index) => ({
          label: artistsSong[index]?.title,
          borderWidth: 2,
          data: data,
          fill: false,
          borderColor:
            index === 0 ? '#4A90E2' : index === 1 ? '#E35050' : '#27BD9C',
          tension: 0.5,
          pointRadius: false,
          pointBackgroundColor: '#fff',
          pointHoverRadius: 5,
          pointBorderColor:
            index === 0 ? '#4A90E2' : index === 1 ? '#E35050' : '#27BD9C',
        })),
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            enabled: false,
            external: function (context) {
              const tooltipModel = context.tooltip;
              let tooltipEl = document.getElementById('chartjs-tooltip');

              // Create tooltip element if not exist
              if (!tooltipEl) {
                tooltipEl = document.createElement('div');
                tooltipEl.id = 'chartjs-tooltip';
                tooltipEl.innerHTML = '<div class="tooltip-content"></div>';
                document.body.appendChild(tooltipEl);
              }

              // Hide if no tooltip
              if (tooltipModel.opacity === 0) {
                tooltipEl.style.opacity = 0;
                return;
              }

              // Set content for tooltip
              if (tooltipModel.body) {
                const datasetIndex = tooltipModel.dataPoints[0].datasetIndex;
                const item = artistsSong[datasetIndex];
                const imgSrc = item.thumbnailM;

                const innerHtml = `
                  <div class="custom-tooltip" style="display: flex; width: 240px; align-items: center; 
                     border-radius: 10px 10px 10px 10px; ${
                       datasetIndex === 0
                         ? ' background-color: #4A90E2;'
                         : datasetIndex === 1
                         ? ' background-color:#E35050 ;'
                         : ' background-color: #27BD9C;'
                     }; justify-content: space-evenly;
                       padding: 5px;   ">
                   <div>
                    <img src="${imgSrc}" style="width:50px;height:50px;" alt="${
                  item.title
                }" />
                    </div>
                   <div class="" style="backgroundColor: rgba(225, 225, 225, 225, 0.3);">
                    <div style="margin-left: 10px; color: #fff;">${
                      item?.title.length > 15
                        ? item?.title?.slice(0, 15) + '...'
                        : item?.title
                    }</div>
                    <div style="margin-left: 10px;  color: #fff;">${
                      item?.artistsNames?.length > 15
                        ? item?.artistsNames?.slice(0, 15) + '...'
                        : item?.artistsNames
                    }</div>
                    </div>
                    <div>
                    <div  style="margin-left: 10px; color: #fff; font-weight: bold;">
                ${
                  Math.round(
                    (item?.score / zingcharts?.chart?.totalScore) * 100
                  ) + '%'
                }
              </div></div>
                  </div>`;

                const tooltipContent =
                  tooltipEl.querySelector('.tooltip-content');
                tooltipContent.innerHTML = innerHtml;
              }

              // Position tooltip
              const position = context.chart.canvas.getBoundingClientRect();
              tooltipEl.style.opacity = 1;
              tooltipEl.style.position = 'absolute';
              tooltipEl.style.left =
                position.left + window.pageXOffset + tooltipModel.caretX + 'px';
              tooltipEl.style.top =
                position.top + window.pageYOffset + tooltipModel.caretY + 'px';
              tooltipEl.style.fontFamily = tooltipModel.options.bodyFont.family;
              tooltipEl.style.fontSize =
                tooltipModel.options.bodyFont.size + 'px';
              tooltipEl.style.fontStyle = tooltipModel.options.bodyFont.style;
              tooltipEl.style.padding =
                tooltipModel.padding + 'px ' + tooltipModel.padding + 'px';
            },
          },
          legend: false,
        },
        interaction: {
          intersect: false,
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
            },
            ticks: { color: `${display ? '#000' : '#fff'}` },
            grid: { color: 'transparent' },
          },
          y: {
            display: true,
            title: {
              display: false,
              text: 'Value',
            },
            ticks: { display: false },
            grid: {
              color: `${display ? '#969696' : 'rgba(225, 225, 225,0.5)'}`,
              drawTicks: false,
            },
            border: { dash: [3, 4] },
          },
        },
        hover: {
          intersect: false,
          mode: 'dataset',
        },
      },
    });

    return () => {
      // Destroy chart on unmount
      myChart.destroy();
    };
  }, [zingcharts]);

  return (
    <div
      className={`${
        display
          ? 'w-[98%] m-auto  h-[450px] '
          : 'w-[98%] m-auto bg-gradient-to-l to-[#391654] from-[#5D2680] h-[450px]'
      }`}
    >
      <div
        className={`${
          display
            ? 'zingchart px-10 text-[40px] font-bold text-gradient py-2'
            : 'zingchart px-10 text-[30px] font-bold text-gradient py-2'
        }`}
      >
        <Link to={path.ZING_CHART}> #zingchart</Link>
        <span className="ml-4">{icons.PlayCircleIconL}</span>
      </div>
      <div className="container_zingchart  flex gap-8 h-80% px-5">
        {display ? (
          ''
        ) : (
          <div className=" w-[40%] h-[90%] z-40">
            {zingcharts?.items?.slice(0, 3).map((item, index) => (
              <div
                key={item.encodeId}
                className="flex justify-between w-[100%] bg-bg-slide_chart m-3 hover:bg-bg-slide rounded-lg items-center"
              >
                <div className="flex justify-start w-[100%] items-center p-3 gap-3">
                  <div
                    className={` font-roboto text-[32px] ${
                      index === 0
                        ? 'text-[#4A90E2]'
                        : index === 1
                        ? 'text-[#E35050]'
                        : 'text-[#27BD9C]'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div
                    className="w-[80px] h-[60px]"
                    onClick={() => {
                      dispatch(actions.setSongId(item?.encodeId));
                      dispatch(actions.setPlay(true));
                    }}
                  >
                    <img
                      className="w-[60px] h-[60px] object-cover"
                      src={item.thumbnailM}
                      alt=""
                    />
                  </div>
                  <div className="w-[100%]">
                    <p className="text-[#C3B5CC] w-full">{item?.title}</p>
                    <p className="text-[#C3B5CC] w-full">
                      {item?.artistsNames}
                    </p>
                  </div>
                </div>
                <div className="text-[#fff] px-3 text-[16px] font-bold">
                  {Math.round(
                    (item?.score / zingcharts?.chart?.totalScore) * 100
                  ) + '%'}
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="zing_chart min-w-[50%] flex-1 h-[90%]">
          {/* Link canvas */}
          <canvas className="h-80 w-52" ref={chartRef}></canvas>
        </div>
      </div>
      {display ? (
        ''
      ) : (
        <div className="btn_review w-[40%] text-center">
          <button
            type="button"
            className="px-[25px] py-[5px] text-white text-[14px] border rounded-l-full rounded-r-full"
          >
            <Link to={path.ZING_CHART}>Xem thêm</Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default Chart;
