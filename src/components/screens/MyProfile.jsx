import { Hash, Building2, CheckCircle, Briefcase, AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '../shared/Card';
import { StatsGrid, StatCard, StatLabel, StatValue, StatIcon } from '../shared/StatCard';
import { InfoGrid, InfoItem, InfoLabel, InfoValue } from '../shared/InfoGrid';
import { Notice, NoticeIcon, NoticeText } from '../shared/Notice';

export function MyProfile({ employee }) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Employee Information</CardTitle>
        </CardHeader>
        <InfoGrid>
          <InfoItem>
            <InfoLabel>Full Name</InfoLabel>
            <InfoValue>{employee?.empName || '-'}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Employee ID</InfoLabel>
            <InfoValue>{employee?.empID || '-'}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Email Address</InfoLabel>
            <InfoValue>{employee?.email || '-'}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Phone Number</InfoLabel>
            <InfoValue>{employee?.phone || '-'}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Department</InfoLabel>
            <InfoValue>{employee?.empDept || '-'}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Employment Status</InfoLabel>
            <InfoValue>{employee?.empType || '-'}</InfoValue>
          </InfoItem>
        </InfoGrid>
        <Notice>
          <NoticeIcon>
            <AlertCircle size={20} />
          </NoticeIcon>
          <NoticeText>
            If any of your information is incorrect, please contact HR at{' '}
            <a href="mailto:hro@askit.com.hk">hro@askit.com.hk</a>.
          </NoticeText>
        </Notice>
      </Card>
    </>
  );
}
