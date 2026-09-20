import {
  AlertOutlined,
  AudioOutlined,
  FullscreenOutlined,
  PauseOutlined,
  PictureOutlined,
  RocketOutlined,
  SoundOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { GridContent } from '@ant-design/pro-components';
import {
  App,
  Badge,
  Button,
  Card,
  Col,
  Descriptions,
  Row,
  Space,
  Tag,
  Timeline,
} from 'antd';
import { type FC, useEffect, useState } from 'react';
import useStyles from './style.style';

/** 分析维度：与流程图「电梯异常」分支一一对应（界面演示用 mock 数据） */
const dimensions = [
  { name: '门状态识别', value: '门关闭', tag: '正常', color: 'green' },
  {
    name: '楼层显示 OCR',
    value: '识别楼层 7F · 置信度 0.96',
    tag: '正常',
    color: 'green',
  },
  { name: '人员滞留', value: '1 人 · 滞留 12:34', tag: '告警', color: 'red' },
  { name: '开关门频率', value: '近 1 小时 8 次', tag: '正常', color: 'green' },
  {
    name: '视频时序分析',
    value: '运行 → 静止，持续 12:34',
    tag: '告警',
    color: 'red',
  },
];

const frames = [
  { label: 'T-30s', note: '事件前', active: false },
  { label: 'T 事件帧', note: '检出时刻', active: true },
  { label: 'T+30s', note: '事件后', active: false },
];

const steps = [
  {
    time: '13:28:41',
    text: '算法检出异常事件并上报（截图 + 短视频 + 置信度）',
    color: 'blue',
  },
  {
    time: '13:28:45',
    text: '驾驶舱实时告警（地图标红、Tab 计数）',
    color: 'blue',
  },
  { time: '13:29:02', text: '值班人员视频核验', color: 'green' },
  { time: '13:29:30', text: '派发工单至物业（SLA 计时中）', color: 'gold' },
  {
    time: '等待中',
    text: '物业接警 → 到场救援 → 结果上传（闭环）',
    color: 'gray',
  },
];

const ElevatorAbnormal: FC = () => {
  const { styles } = useStyles();
  const { message } = App.useApp();
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');
  const timeText = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

  const toast = (action: string) =>
    message.info(`${action}（演示：仅界面，暂不执行真实逻辑）`);

  return (
    <GridContent>
      <Row gutter={16}>
        <Col span={24}>
          <Card
            variant="borderless"
            title={
              <Space>
                <AlertOutlined style={{ color: '#ff4d4f' }} />
                电梯异常检测
                <Badge status="processing" text="实时检测中" />
              </Space>
            }
          >
            <Descriptions
              column={{ xs: 1, sm: 2, lg: 4 }}
              size="small"
              items={[
                { key: 'b', label: '楼栋', children: '滨河小区 3号楼 1单元' },
                { key: 'e', label: '电梯编号', children: '3#-1-02' },
                {
                  key: 'l',
                  label: '事件等级',
                  children: <Tag color="red">高</Tag>,
                },
                { key: 'd', label: '已持续', children: '12 分 34 秒' },
                { key: 'p', label: '滞留人数', children: '1 人' },
                { key: 'c', label: '检测置信度', children: '0.97' },
                { key: 'id', label: '事件 ID', children: 'EVT-20260918-0037' },
                {
                  key: 'ch',
                  label: '视频通道',
                  children: (
                    <Space size={4}>
                      <Badge status="success" />
                      CH-3B-102 在线
                    </Space>
                  ),
                },
              ]}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col xl={15} lg={24} style={{ marginBottom: 16 }}>
          <Card
            variant="borderless"
            title="实时视频 · 困人检测"
            extra={
              <Space size={4}>
                <Tag color="blue">1080P</Tag>
                <Tag color="blue">15fps</Tag>
              </Space>
            }
          >
            <div className={styles.videoWrap}>
              <img
                className={styles.videoImg}
                src="/elevator/trapped.jpg"
                alt="电梯轿厢模拟监控画面"
              />
              <div className={styles.videoTopLeft}>
                <Tag color="red" icon={<Badge status="error" />}>
                  电梯静止 · 门关闭
                </Tag>
                <Tag color="blue">OCR: 7F</Tag>
              </div>
              <div className={styles.videoTopRight}>
                <span className={styles.liveDot} />
                LIVE {timeText}
              </div>
              <div
                className={styles.detectBox}
                style={{ left: '40%', top: '28%', width: '20%', height: '42%' }}
              >
                <span className={styles.detectLabel}>P1 · 0.97</span>
              </div>
              <div className={styles.videoControls}>
                <button
                  className={styles.ctrlBtn}
                  type="button"
                  onClick={() => toast('暂停视频')}
                >
                  <PauseOutlined />
                </button>
                <button
                  className={styles.ctrlBtn}
                  type="button"
                  onClick={() => toast('截图取证')}
                >
                  <PictureOutlined />
                </button>
                <button
                  className={styles.ctrlBtn}
                  type="button"
                  onClick={() => toast('声音开关')}
                >
                  <SoundOutlined />
                </button>
                <button
                  className={styles.ctrlBtn}
                  type="button"
                  onClick={() => toast('全屏查看')}
                >
                  <FullscreenOutlined />
                </button>
                <span className={styles.ctrlText}>
                  模拟通道 · 事件前后 15s 缓存已留存
                </span>
              </div>
            </div>

            <div className={styles.framesRow}>
              {frames.map((f) => (
                <div
                  key={f.label}
                  className={`${styles.frameItem} ${f.active ? styles.frameItemActive : ''}`}
                >
                  <img
                    className={styles.frameImg}
                    src="/elevator/trapped.jpg"
                    alt={f.label}
                  />
                  <div className={styles.frameTag}>
                    <b>{f.label}</b>
                    <span>{f.note}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>

        <Col xl={9} lg={24}>
          <Card
            variant="borderless"
            title="分析维度"
            style={{ marginBottom: 16 }}
          >
            {dimensions.map((d) => (
              <div key={d.name} className={styles.dimItem}>
                <span className={styles.dimName}>{d.name}</span>
                <span className={styles.dimRight}>
                  <span className={styles.dimValue}>{d.value}</span>
                  <Tag color={d.color}>{d.tag}</Tag>
                </span>
              </div>
            ))}
          </Card>

          <Card
            variant="borderless"
            title="检测引擎"
            style={{ marginBottom: 16 }}
          >
            <Descriptions
              column={1}
              size="small"
              items={[
                {
                  key: 'a',
                  label: '检测算法',
                  children: 'YOLOv8 人体检测 + ByteTrack 跟踪',
                },
                {
                  key: 'b',
                  label: '输入规格',
                  children: '1080P · 15fps（轿厢顶置摄像头）',
                },
                { key: 'c', label: '置信度阈值', children: '0.85' },
                { key: 'd', label: '模型版本', children: 'trapped-v1.2.0' },
              ]}
            />
          </Card>

          <Card variant="borderless" title="处置操作">
            <Space wrap>
              <Button
                type="primary"
                icon={<VideoCameraOutlined />}
                onClick={() => toast('视频核验')}
              >
                视频核验
              </Button>
              <Button
                icon={<AudioOutlined />}
                onClick={() => toast('语音喊话')}
              >
                语音喊话
              </Button>
              <Button
                danger
                type="primary"
                icon={<RocketOutlined />}
                onClick={() => toast('派发工单')}
              >
                派发工单
              </Button>
            </Space>
            <div style={{ marginTop: 16 }}>
              <Timeline
                items={steps.map((s) => ({
                  color: s.color,
                  children: (
                    <div>
                      <b>{s.time}</b>
                      <div style={{ color: 'rgba(0,0,0,0.65)', fontSize: 12 }}>
                        {s.text}
                      </div>
                    </div>
                  ),
                }))}
              />
            </div>
          </Card>
        </Col>
      </Row>
    </GridContent>
  );
};

export default ElevatorAbnormal;
