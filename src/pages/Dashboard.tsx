import { Card, Row, Col, Statistic } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { getStats } from '../api/stats';

function Dashboard() {
  const { data, isLoading } = useQuery(['stats'], getStats);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Users"
              value={data?.totalUsers}
              loading={isLoading}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Contacts"
              value={data?.totalContacts}
              loading={isLoading}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;