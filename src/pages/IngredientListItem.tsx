import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { Ingredient, IngredientStatus, updateIngredient } from "../api";

type IngredientListItemProps = {
  ingredient: Ingredient;
  // ... additional props
};

export const IngredientListItem: React.FC<IngredientListItemProps> = (props: IngredientListItemProps) => {
  const [status, setStatus] = useState<IngredientStatus>(props.ingredient.status);
  const totalStatuses = Object.keys(IngredientStatus).length / 2;

  const onSwipedLeft = async () => await onSwiped(status + 1);

  const onSwipedRight = async () => await onSwiped((status - 1 + totalStatuses));

  const onSwiped = async (direction: number) => {
    const nextStatus = direction % totalStatuses;
    await updateIngredient({ ...props.ingredient, status: nextStatus })
      .then((data) => {
        console.log(data);
      });

    setStatus(nextStatus as IngredientStatus);
  }

  const handlers = useSwipeable({
    onSwipedLeft,
    onSwipedRight,
    trackMouse: false
  });

  return (
    <div className={`list-item`} {...handlers}>
      {props.ingredient.name}

      <div className={`status ${IngredientStatus[status]}`}>{IngredientStatus[status]}</div>

      <div className="tags">
        {props.ingredient.tags.map((tag, index) => (
          <div key={index} className="tag chip">{tag}</div>
        ))}
      </div>
    </div>
  );
};
