import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    setStatus(props.ingredient.status);
  }, [props.ingredient]);

  const onSwiped = async (nextStatus: IngredientStatus) => {
    await updateIngredient({ ...props.ingredient, status: nextStatus, statusDate: new Date() });

    setStatus(nextStatus);
    setStatusDate(new Date());
  }

  return (
    <div className={`list-item`}>
      <div>
        <p>{props.ingredient.name}</p>
        {props.ingredient.expirationDate &&
          <p className="expiration">{describeDateDifference(props.ingredient.expirationDate)}</p>}
      </div>
      <button className="icon-button edit-button" onClick={() => props.onClick(props.ingredient)}><FontAwesomeIcon icon={faPencil} /></button>

      <div className="status-container">
        <select
          className={`status ${IngredientStatus[status]}`}
          value={status}
          onChange={(e) => onSwiped(Number(e.target.value) as IngredientStatus)}
        >
          {Object.keys(IngredientStatus)
            .filter((key) => isNaN(Number(key)))
            .map((key) => (
              <option key={IngredientStatus[key]} value={IngredientStatus[key]}>
                {key}
              </option>
            ))}
        </select>
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

function describeDateDifference(targetDate: Date): string {
  const now = new Date();
  const oneDay = 1000 * 60 * 60 * 24;
  const oneWeek = oneDay * 7;
  const oneMonth = oneDay * 30;
  const oneYear = oneDay * 365;

  const diff = targetDate.getTime() - now.getTime();

  if (diff < 0) {
    return "expired";
  } else if (diff === 0) {
    return "expires today!";
  } else if (diff < oneDay) {
    return "expires tomorrow!";
  } else if (diff < oneWeek) {
    const days = Math.round(diff / oneDay);
    return `expires in ${days}`;
  } else if (diff < oneMonth) {
    const weeks = Math.round(diff / oneWeek);
    return weeks === 1 ? `expires in ${weeks} week` : `expires in ${weeks} weeks`;
  } else if (diff < oneYear) {
    const months = Math.round(diff / oneMonth);
    return months === 1 ? `expires in ${months} month` : `expires in ${months} months`;
  } else {
    const years = now.getFullYear() - targetDate.getFullYear();
    return years === 1 ? "expires next year" : `expires in ${years} years`;
  }
}
