import React from "react";
import EditGoalForm from "./EditGoalForm";
import GoalItem from "./GoalItem";

// const GoalsList = ( {goals, deleteGoal, enterGoalEditMode}) => {
//   return (
//     <ul className="goalsList">
//         {goals.sort((a,b)=>b.id-a.id).map(g=>(
//             <GoalItem key={g.id} goal={g} deleteGoal={deleteGoal} enterGoalEditMode = {enterGoalEditMode}
//             />
//         ))}
//     </ul>
//   )
// }

// export default GoalsList

const GoalsList = ({
  goals,
  deleteGoal,
  enterGoalEditMode,
  isEditingGoal,
  editedGoal,
  updateGoal,
  closeGoalEditMode,
  toggleGoal,
  listContainerStyle,
}) => {
  return (
    <ul className="goalsList" style={listContainerStyle}>
      {goals
        .sort((a, b) => b.id - a.id)
        .map((g) =>
          isEditingGoal === true && editedGoal.id === g.id ? (
            isEditingGoal && (
              <EditGoalForm
                key={g.id}
                editedGoal={editedGoal}
                updateGoal={updateGoal}
                closeGoalEditMode={closeGoalEditMode}
              />
            )
          ) : (
            <GoalItem
              key={g.id}
              goal={g}
              deleteGoal={deleteGoal}
              enterGoalEditMode={enterGoalEditMode}
              toggleGoal={toggleGoal}
            />
          )
        )}
    </ul>
  );
};

export default GoalsList;
