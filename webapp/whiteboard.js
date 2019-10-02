// Expanded on example from http://paperjs.org/examples/path-simplification/

const MinimumLineLength = 100;
const StraightIsh = 0.95;
const StrokeWidth = 3;

let currentColor = 'rgb(0, 0, 0)';

// Quick way to select elements
const $ = sel => document.querySelector(sel);

function initWhiteboard() {
	const canvas = $('canvas');
	paper.setup(canvas);

	const { Point, PointText, Path, Tool } = paper;
	let path;

	const textItem = new PointText({
		content: 'Click and drag to draw a line.',
		point: new Point(20, 30),
		fillColor: 'black',
	});

	const tool = new Tool();

	tool.onMouseDown = (event) => {
		// If we produced a path before, deselect it:
		if (path) {
			path.selected = false;
		}

		// Create a new path and set its stroke color to black:
		path = new Path({
			segments: [event.point],
			strokeColor: currentColor,
			strokeWidth: StrokeWidth,
			// Select the path, so we can see its segment points:
			fullySelected: true
		});
	};

	// While the user drags the mouse, points are added to the path
	// at the position of the mouse:
	tool.onMouseDrag = (event) => {
		path.add(event.point);

		// Update the content of the text item to show how many
		// segments it has:
		textItem.content = 'Segment count: ' + path.segments.length;
	};

	// When the mouse is released, we simplify the path:
	tool.onMouseUp = (event) => {
		const segmentCount = path.segments.length;
		// console.log('length', path.length);
		const start = path.firstSegment.point;
		const stop = path.lastSegment.point;
		const length = new Point(start.x - stop.x, start.y - stop.y).length;
		const straightness = length / path.length;
		if (length > MinimumLineLength && straightness > StraightIsh) {
			path.remove();
			const line = new Path({
				segments: [start, stop],
				strokeColor: currentColor,
				strokeWidth: StrokeWidth,
				fullySelected: false,
			});
		}
		else {
			// When the mouse is released, simplify it:
			path.simplify(10);

			// Select the path, so we can see its segments:
			path.fullySelected = true;

			const newSegmentCount = path.segments.length;
			const difference = segmentCount - newSegmentCount;
			const percentage = 100 - Math.round(newSegmentCount / segmentCount * 100);
			textItem.content = difference + ' of the ' + segmentCount + ' segments were removed. Saving ' + percentage + '%';
		}
	};
}

function clearAll() {
	paper.project.clear();
}

function initColorPalette() {
	$('.colors').onclick = (e) => {
		if (!e.target.classList.contains('color')) return;
		const current = $('.color.selected');
		if (current) current.classList.remove('selected');
		e.target.classList.add('selected');
		currentColor = e.target.style.backgroundColor;
	}
	$('#clear-all').onclick = clearAll;
}

function init() {
	initWhiteboard();
	initColorPalette();
}

window.onload = init;
