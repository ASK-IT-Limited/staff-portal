import { useState } from 'react';
import styled from 'styled-components';
import { Calendar, AlertCircle, Loader2 } from 'lucide-react';
import { generateTimesheetTemplate } from '../../services/api';
import { Card, CardHeader, CardTitle } from '../shared/Card';
import { InfoGrid, InfoItem, InfoLabel, InfoValue } from '../shared/InfoGrid';
import { Notice, NoticeIcon, NoticeText } from '../shared/Notice';

const TimesheetCard = styled(Card)`
  margin-bottom: 24px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 8px;
`;

const Select = styled.select`
  width: 100%;
  max-width: 200px;
  padding: 10px 12px;
  font-size: 14px;
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  border-radius: 8px;
  background: #fff;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(44, 90, 160, 0.1);
  }
`;

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  background: ${({ theme }) => theme.colors.primary};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: #1e4a8a;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SpinnerIcon = styled(Loader2)`
  animation: spin 1s linear infinite;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const StatusMessage = styled.div`
  margin-top: 16px;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  background: ${({ $success }) => ($success ? '#d1fae5' : '#fee2e2')};
  color: ${({ $success }) => ($success ? '#065f46' : '#991b1b')};
  border: 1px solid ${({ $success }) => ($success ? '#10b981' : '#ef4444')};
`;

export function TimesheetGenerator({ employee }) {
  const [selectedYear, setSelectedYear] = useState('2026');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleGenerate = async () => {
    setIsLoading(true);
    setStatus(null);

    try {
      const result = await generateTimesheetTemplate(employee?.email);
      setStatus({ success: true, message: result.message });
    } catch (error) {
      setStatus({ success: false, message: error.message || 'Failed to generate template. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <TimesheetCard>
        <CardHeader>
          <CardTitle>Contract Working Hours</CardTitle>
        </CardHeader>
        <InfoGrid>
          <InfoItem>
            <InfoLabel>Weekday Start</InfoLabel>
            <InfoValue>{employee?.weekdayStart || '-'}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Weekday End</InfoLabel>
            <InfoValue>{employee?.weekdayEnd || '-'}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Saturday Start</InfoLabel>
            <InfoValue>{employee?.satStart || '-'}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Saturday End</InfoLabel>
            <InfoValue>{employee?.satEnd || '-'}</InfoValue>
          </InfoItem>
        </InfoGrid>
        <Notice>
          <NoticeIcon>
            <AlertCircle size={20} />
          </NoticeIcon>
          <NoticeText>
            These values are from your employment contract. If you need to change them, please contact HR at{' '}
            <a href="mailto:hro@askit.com.hk">hro@askit.com.hk</a>.
          </NoticeText>
        </Notice>
      </TimesheetCard>

      <Card>
        <CardHeader>
          <CardTitle>Generate Template</CardTitle>
        </CardHeader>
        <FormGroup>
          <Label htmlFor="year-select">Select Year</Label>
          <Select
            id="year-select"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="2026">2026</option>
          </Select>
        </FormGroup>
        <Button onClick={handleGenerate} disabled={isLoading}>
          {isLoading ? (
            <>
              <SpinnerIcon size={16} />
              Generating...
            </>
          ) : (
            <>
              <Calendar size={16} />
              Generate Template
            </>
          )}
        </Button>
        {status && (
          <StatusMessage $success={status.success}>
            {status.message}
          </StatusMessage>
        )}
      </Card>
    </>
  );
}
