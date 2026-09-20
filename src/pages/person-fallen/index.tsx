import {
  AudioOutlined,
  FullscreenOutlined,
  MedicineBoxOutlined,
  NotificationOutlined,
  PauseOutlined,
  PictureOutlined,
  SoundOutlined,
  VideoCameraOutlined,
  WarningOutlined,
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
  Steps,
  Tag,
  Timeline,
} from 'antd';
import { type FC, useEffect, useState } from 'react';
import useStyles from './style.style';

/** 分析维度：与流程图「人员倒地」分支一一对应（界面演示用 mock 数据） */
const dimensions = [
  { name: '人体检测', value: 'Person 1 · 0.94', tag: '检出', color: 'blue' },
  { name: '姿态估计', value: '躺卧 · 0.91', tag: '告警', color: 'red' },
  {
    name: '多目标跟踪',
    value: 'ID 12 · 轨迹稳定',
    tag: '正常',
    color: 'green',
  },
];

const seqItems = [
  { title: '站立', status: 'finish' as const },
  { title: '下落', status: 'process' as const },
  { title: '躺卧', status: 'error' as const },
];

const steps = [
  {
    time: '13:31:02',
    text: '算法检出倒地事件并上报（关键点 + 时序证据）',
    color: 'blue',
  },
  {
    time: '13:31:06',
    text: '驾驶舱告警卡片（地图定位、事件分级）',
    color: 'blue',
  },
  { time: '13:31:25', text: '通知物业/安保前往现场', color: 'gold' },
  { time: '13:31:50', text: '必要时呼叫急救（120 联络）', color: 'red' },
  { time: '等待中', text: '现场确认 → 救助记录 → 事件归档', color: 'gray' },
];

const PersonFallen: FC = () => {
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
                <WarningOutlined style={{ color: '#faad14' }} />
                人员倒地检测
                <Badge status="processing" text="实时检测中" />
              </Space>
            }
          >
            <Descriptions
              column={{ xs: 1, sm: 2, lg: 4 }}
              size="small"
              items={[
                { key: 'b', label: '楼栋', children: '县府家属院 2号楼' },
                { key: 'e', label: '电梯编号', children: '2#-1-01' },
                {
                  key: 'l',
                  label: '事件等级',
                  children: <Tag color="gold">中</Tag>,
                },
                { key: 'd', label: '已持续', children: '42 秒' },
                { key: 'p', label: '跟踪 ID', children: '12' },
                { key: 'c', label: '姿态置信度', children: '0.91' },
                { key: 'id', label: '事件 ID', children: 'EVT-20260918-0041' },
                {
                  key: 'ch',
                  label: '视频通道',
                  children: (
                    <Space size={4}>
                      <Badge status="success" />
                      CH-2A-101 在线
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
            title="实时视频 · 跌倒/昏迷检测"
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
                src="/elevator/fallen.jpg"
                alt="电梯轿厢人员倒地模拟监控画面"
              />
              <div className={styles.videoTopLeft}>
                <Tag color="red" icon={<Badge status="error" />}>
                  检测到倒地 · 持续 42s
                </Tag>
                <Tag color="gold">姿态: 躺卧</Tag>
              </div>
              <div className={styles.videoTopRight}>
                <span className={styles.liveDot} />
                LIVE {timeText}
              </div>
              <div
                className={styles.detectBox}
                style={{ left: '34%', top: '50%', width: '32%', height: '36%' }}
              >
                <span className={styles.detectLabel}>P1 · 0.94 倒地</span>
              </div>
              <svg
                className={styles.skeletonSvg}
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-label="人体关键点骨架示意"
              >
                <g
                  fill="none"
                  stroke="#22d3ee"
                  strokeWidth="0.55"
                  opacity="0.9"
                >
                  <line x1="42" y1="58" x2="48" y2="65" />
                  <line x1="48" y1="65" x2="57" y2="74" />
                  <line x1="57" y1="74" x2="63" y2="80" />
                  <line x1="63" y1="80" x2="67" y2="86" />
                </g>
                <g fill="#22d3ee">
                  <circle cx="42" cy="58" r="1.6" />
                  <circle cx="48" cy="65" r="1.4" />
                  <circle cx="57" cy="74" r="1.4" />
                  <circle cx="63" cy="80" r="1.3" />
                  <circle cx="67" cy="86" r="1.3" />
                </g>
              </svg>
              <div className={styles.skeletonNote}>
                姿态关键点示意（17 点简示）
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
            <div className={styles.dimItem} style={{ borderBottom: 'none' }}>
              <span className={styles.dimName}>时序动作识别</span>
              <div className={styles.seqSteps}>
                <Steps size="small" current={2} items={seqItems} />
              </div>
            </div>
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
                  children: 'RTMPose 姿态估计 + 时序状态机',
                },
                {
                  key: 'b',
                  label: '关键点',
                  children: '17 个（头部、躯干、四肢）',
                },
                {
                  key: 'c',
                  label: '输入规格',
                  children: '1080P · 15fps（轿厢顶置摄像头）',
                },
                { key: 'd', label: '置信度阈值', children: '0.80' },
                { key: 'e', label: '模型版本', children: 'fallen-v1.1.0' },
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
                icon={<NotificationOutlined />}
                onClick={() => toast('通知物业')}
              >
                通知物业
              </Button>
              <Button
                danger
                type="primary"
                icon={<MedicineBoxOutlined />}
                onClick={() => toast('呼叫急救')}
              >
                呼叫急救
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

export default PersonFallen;
