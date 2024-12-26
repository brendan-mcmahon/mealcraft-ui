import { useRef, useState, useEffect } from 'react';
import { saveGrocery, deleteGrocery, getAllTags } from '../../api';
import { GroceryType, Location, LocationNames } from '../../models/Models';
import Modal from "../../Modal";
import { Tag } from '../Tag';
import Loading from '../../Loading';

export function GroceryForm({ grocery, isOpen, onSaveComplete, handleCancel, onDelete }) {
	const [allTags, setAllTags] = useState([]);
	const input = useRef(null);
	const [isProcessing, setIsProcessing] = useState(false);
	const [updatedGrocery, setUpdatedGrocery] = useState(grocery);

	useEffect(() => {
		if (isOpen && input.current) {
			input.current.focus();
		}

		getAllTags()
			.then(data => setAllTags(data))
			.catch(error => console.error(error));

	}, [isOpen]);

	const addTag = (tag, checked) => {
		console.log("this is adding tag...", tag, checked);
		if (checked) {
			setUpdatedGrocery({ ...updatedGrocery, tags: [...updatedGrocery.tags, tag] });
		} else {
			setUpdatedGrocery({ ...updatedGrocery, tags: updatedGrocery.tags.filter((t) => t.id !== tag.id) });
		}
	};

	const handleSave = (e) => {
		console.log("this is handling save...");
		e.preventDefault();

		setIsProcessing(true);

		saveGrocery(updatedGrocery)
			.then(() => {
				onSaveComplete(updatedGrocery);
				setIsProcessing(false);
				setUpdatedGrocery(null);
			})
			.catch((error) => {
				setIsProcessing(false);
				console.error(error);
			});
	};

	const deleteThis = () => {
		if (grocery) {
			deleteGrocery(grocery.id)
				.then(() => {
					onDelete(grocery);
					setUpdatedGrocery(null);
				})
				.catch((error) => console.error(error));
		}
	}

	return (<Modal title={updatedGrocery?.name || "New Grocery"} isOpen={isOpen} onClose={handleCancel}>
		{isProcessing && <div className="loading"><Loading /><span>Saving...</span></div>}
		<form onSubmit={handleSave}>
			<div className="form-group name">
				<label>Name</label>
				<input
					ref={input}
					className="grocery-input"
					value={updatedGrocery.name}
					onChange={e => setUpdatedGrocery({ ...grocery, name: e.target.value })}
					type="text"
					placeholder="Grocery name" />
			</div>

			<div className='form-group type'>
				<label>Type</label>
				<select className="grocery-type" value={updatedGrocery.type} onChange={e => setUpdatedGrocery({ ...updatedGrocery, type: parseInt(e.target.value) })}>
					{
						Object.keys(GroceryType)
							.filter((key) => !isNaN(Number(key)))
							.map((type) => (
								<option key={type} value={parseInt(type)}>{GroceryType[parseInt(type)]}</option>
							))
					}
				</select>
			</div>

			{
				updatedGrocery.type === GroceryType.Food &&
				<div className="form-group expiration-date">
					<label>Expiration Date</label>
					<input
						className="grocery-input"
						value={updatedGrocery.expirationDate ? updatedGrocery.expirationDate.toISOString().split('T')[0] : ''}
						onChange={e => setUpdatedGrocery({ ...updatedGrocery, expirationData: (e.target.value ? new Date(e.target.value) : null) })}
						type="date"
						placeholder="Expiration Date" />
				</div>
			}

			<div className='form-group location'>
				<label>Location</label>
				<select className="grocery-location" value={updatedGrocery.location || ''} onChange={e => setUpdatedGrocery({ ...updatedGrocery, location: Number(e.target.value) })}>
					{Object.keys(Location).filter(l => !isNaN(Number(l))).map((key) => (
						<option key={key} value={Number(key)}>
							{LocationNames[key]}
						</option>
					))}
				</select>

			</div>
			<div className="form-group tags">
				{allTags.map((tag, index) => {
					return (
						<Tag key={index} name={tag.label} tag={tag} onSelect={addTag} selected={grocery?.tags.map(t => t.id).includes(tag.id)} />
					)
				}
				)}
			</div>

			<div className="buttons">
				{!!grocery && <button type="button" disabled={isProcessing} className="delete-button" onClick={deleteThis}>Delete</button>}
				<button disabled={isProcessing} type="submit">Save</button>
			</div>
		</form>
	</Modal >);
}
