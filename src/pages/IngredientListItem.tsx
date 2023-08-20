import React, { useState, useEffect } from "react";
// import { useSwipeable } from "react-swipeable";
import { updateIngredient } from "../api";
import { Ingredient, IngredientStatus } from '../Ingredient';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

type IngredientListItemProps = {
  ingredient: Ingredient;
  onClick: (ingredient: Ingredient) => void;
};

export const IngredientListItem: React.FC<IngredientListItemProps> = (props: IngredientListItemProps) => {
  const [status, setStatus] = useState<IngredientStatus>(props.ingredient.status);
  const [statusDate, setStatusDate] = useState<Date | null>(props.ingredient.statusDate || null);
  const totalStatuses = Object.keys(IngredientStatus).length / 2;

  useEffect(() => {
    setStatus(props.ingredient.status);
  }, [props.ingredient]);

  // const onSwipedLeft = async () => await onSwiped(status + 1);

  const onSwipedRight = async () => await onSwiped((status - 1 + totalStatuses));

  const onSwiped = async (direction: number) => {
    const nextStatus = direction % totalStatuses;
    await updateIngredient({ ...props.ingredient, status: nextStatus, statusDate: new Date() });

    setStatus(nextStatus as IngredientStatus);
    setStatusDate(new Date());
  }

  return (
    <div className={`list-item`} >
      <span>{props.ingredient.name}</span>

      <button className="icon-button edit-button" onClick={() => props.onClick(props.ingredient)}><FontAwesomeIcon icon={faPencil} /></button>

      <div className="status-container">
        <div className={`status ${IngredientStatus[status]}`} onClick={() => onSwipedRight()}>{IngredientStatus[status]}</div>
        <div className="status-date">Updated {timeAgo(statusDate)}</div>
      </div>

      <div className="tags">
        {props.ingredient.tags.map((tag, index) => (
          <div key={index} className="tag chip">{tag}</div>
        ))}
      </div>
    </div>
  );
};

function timeAgo(inputDate: Date | null): string {
  if (inputDate === null) return "never";

  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const normalizedInputDate = new Date(inputDate);
  normalizedInputDate.setHours(0, 0, 0, 0);

  const timeDifference = now.getTime() - normalizedInputDate.getTime();
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  if (daysDifference === 0)
    return "today";
  else if (daysDifference === 1)
    return "yesterday";
  else if (daysDifference <= 7)
    return `${daysDifference} days ago`;
  else if (daysDifference <= 14)
    return "over a week ago";
  else if (daysDifference <= 21)
    return "over 2 weeks ago";
  else if (daysDifference <= 28)
    return "over 3 weeks ago";
  else if (daysDifference <= 32)
    return "over a month ago";
  else {
    const months = Math.floor(daysDifference / 30);
    return `over ${months} months ago`;
  }
}
