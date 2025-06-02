<script lang="ts">
	import { Command } from "bits-ui";

	type Emoji = {
		char: string;
		keywords: string[];
		disabled?: boolean;
	};

	type EmojiGroup = {
		name: string;
		emojis: Emoji[];
	};

	const emojiGroups: EmojiGroup[] = [
		{
			name: "Pinned",
			emojis: [
				{ char: "🤷‍♂️", keywords: ["shrug"] },
				{ char: "✅", keywords: ["check", "mark"], disabled: true }, // disabled
				{ char: "🎉", keywords: ["party"] },
			],
		},
		{
			name: "Frequently Used",
			emojis: [
				{ char: "¢", keywords: ["cent", "currency"] },
				{ char: "📦", keywords: ["box", "cardboard", "shipping"], disabled: true }, // disabled
				{ char: "🛜", keywords: ["wifi"] },
				{ char: "🔥", keywords: ["fire", "hot"] },
				{ char: "⭐", keywords: ["star", "favorite"] },
				{ char: "👍", keywords: ["thumbs up", "like", "approve"] },
				{ char: "🚀", keywords: ["rocket", "launch"], disabled: true }, // disabled
				{ char: "👏", keywords: ["clap", "applause"] },
			],
		},
		{
			name: "All Emojis",
			emojis: [
				{ char: "😊", keywords: ["smile", "happy", "face"] },
				{ char: "❤️", keywords: ["heart", "love"] },
				{ char: "👀", keywords: ["eyes", "look", "see"] },
				{ char: "💡", keywords: ["lightbulb", "idea"] },
				{ char: "☕", keywords: ["coffee", "drink", "break"], disabled: true }, // disabled
				{ char: "💻", keywords: ["computer", "laptop", "work"] },
				{ char: "✏️", keywords: ["pencil", "edit", "write"] },
				{ char: "📅", keywords: ["calendar", "date", "schedule"] },
				{ char: "📱", keywords: ["phone", "call", "mobile"] },
				{ char: "🎵", keywords: ["music", "note", "song"] },
				{ char: "📷", keywords: ["camera", "photo", "picture"] },
				{ char: "🎁", keywords: ["gift", "present", "surprise"] },
				{ char: "🌙", keywords: ["moon", "night", "sleep"] },
				{ char: "☀️", keywords: ["sun", "day", "weather"] },
				{ char: "🌈", keywords: ["rainbow", "color", "pride"] },
				{ char: "🌍", keywords: ["earth", "world", "globe"] },
				{ char: "🌳", keywords: ["tree", "nature", "plant"] },
				{ char: "🌸", keywords: ["flower", "nature", "spring"] },
				{ char: "🎆", keywords: ["fireworks", "celebration", "festival"] },
				{ char: "🎈", keywords: ["balloon", "party", "birthday"] },
				{ char: "🍪", keywords: ["cookie", "snack", "dessert"] },
				{ char: "🍕", keywords: ["pizza", "food", "slice"], disabled: true }, // disabled
				{ char: "🍦", keywords: ["ice cream", "dessert", "sweet"] },
				{ char: "🍎", keywords: ["apple", "fruit", "food"] },
				{ char: "🍌", keywords: ["banana", "fruit", "yellow"] },
				{ char: "🚗", keywords: ["car", "vehicle", "drive"] },
				{ char: "🚲", keywords: ["bicycle", "bike", "ride"] },
				{ char: "🚆", keywords: ["train", "travel", "transport"] },
				{ char: "✈️", keywords: ["airplane", "flight", "travel"] },
				{ char: "⚓", keywords: ["anchor", "boat", "sea"] },
				{ char: "🏅", keywords: ["medal", "award", "winner"] },
				{ char: "⚽", keywords: ["soccer", "football", "sport"] },
				{ char: "🏀", keywords: ["basketball", "sport", "game"] },
				{ char: "🏆", keywords: ["trophy", "award", "win"] },
				{ char: "📚", keywords: ["book", "read", "study"] },
				{ char: "✉️", keywords: ["mail", "envelope", "letter"] },
				{ char: "🤩", keywords: ["star eyes", "excited", "wow"] },
				{ char: "🤔", keywords: ["thinking", "hmm", "question"] },
				{ char: "😴", keywords: ["sleepy", "tired", "zzz"] },
				{ char: "😢", keywords: ["cry", "sad", "tears"] },
				{ char: "😂", keywords: ["laugh", "joy", "funny"] },
				{ char: "😉", keywords: ["wink", "flirt", "smile"] },
				{ char: "🤓", keywords: ["nerd", "geek", "glasses"] },
				{ char: "🤖", keywords: ["robot", "ai", "machine"] },
				{ char: "👻", keywords: ["ghost", "spooky", "halloween"], disabled: true }, // disabled
				{ char: "👽", keywords: ["alien", "space", "ufo"] },
			],
		},
	];
</script>

<Command.Root
	columns={8}
	class="divide-border border-muted bg-background flex h-full w-full flex-col divide-y self-start overflow-hidden rounded-xl border"
>
	<Command.Input
		class="focus-override h-input placeholder:text-foreground-alt/50 focus:outline-hidden bg-background inline-flex truncate rounded-tl-xl rounded-tr-xl px-4 text-sm transition-colors focus:ring-0"
		placeholder="Search Emoji and Symbols..."
	/>
	<Command.List class="max-h-[280px] overflow-y-auto overflow-x-hidden px-2 pb-2">
		<Command.Viewport>
			<Command.Empty
				class="text-muted-foreground flex w-full items-center justify-center pb-6 pt-8 text-sm"
			>
				No emojis or symbols found.
			</Command.Empty>
			{#each emojiGroups as group (group)}
				<Command.Group>
					<Command.GroupHeading class="text-muted-foreground px-2 pb-2 pt-4 text-xs">
						{group.name}
					</Command.GroupHeading>
					<Command.GroupItems class="grid grid-cols-8 gap-2 px-2">
						{#each group.emojis as emoji (emoji)}
							<Command.Item
								class="rounded-button bg-muted data-selected:ring-foreground outline-hidden flex aspect-square size-full aria-disabled:cursor-not-allowed aria-disabled:opacity-50 cursor-pointer select-none items-center justify-center text-2xl ring-2 ring-transparent"
								keywords={emoji.keywords}
								disabled={emoji.disabled}
							>
								{emoji.char}
							</Command.Item>
						{/each}
					</Command.GroupItems>
				</Command.Group>
			{/each}
		</Command.Viewport>
	</Command.List>
</Command.Root>
