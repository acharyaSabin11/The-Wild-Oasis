import styled from "styled-components";
import useTodaysActivities from "./useTodaysActivities";
import SpinnerMini from "../../ui/SpinnerMini";
import ActivityItem from "./ActivityItem";

const StyledTodaysActivity = styled.div`
  grid-column: 1/3;
  grid-row: 2/3;
  background-color: var(--color-grey-0);
  padding: 1.5rem 2rem;
  color: var(--color-grey-700);
  display: flex;
  flex-direction: column;
  gap: 2rem;
  height: 30rem;
  width: 100%;
  border-radius: var(--border-radius-md);
`;

const Title = styled.span`
  color: var(--color-grey-700);
  font-size: 1%.4;
  font-weight: 700;
`;

const ActivityList = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-top: 1px solid var(--color-grey-300);
`;

const Screen = styled.div`
  height: 300px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-grey-0);
  grid-row: 2/3;
  grid-column: 1/3;
  /* color: var(--color-red-700); */
  font-weight: 500;
`;

const Empty = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color-grey-700);
  font-size: 1.7rem;
  flex: 1;
`;

function TodaysActivity() {
  const { todaysActivities, todaysActivitiesError, todaysActivitiesIsLoading } =
    useTodaysActivities();

  if (todaysActivitiesIsLoading)
    return (
      <Screen>
        <SpinnerMini />
      </Screen>
    );

  if (todaysActivitiesError)
    return <Screen>Failed to load Today &apos; Activities</Screen>;

  return (
    <StyledTodaysActivity>
      <Title>{"Today's Activity"}</Title>
      {!todaysActivities.length && <Empty>No Activities Today </Empty>}
      {todaysActivities.length ? (
        <ActivityList>
          {todaysActivities.map((activity) => (
            <ActivityItem activity={activity} key={activity.id} />
          ))}
        </ActivityList>
      ) : null}
    </StyledTodaysActivity>
  );
}

export default TodaysActivity;
