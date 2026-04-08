<script lang="ts">
	import { Command } from "bits-ui";
	import FileCss from "phosphor-svelte/lib/FileCss";
	import FileJs from "phosphor-svelte/lib/FileJs";
	import FileTs from "phosphor-svelte/lib/FileTs";
	import FileTsx from "phosphor-svelte/lib/FileTsx";
	import FileMd from "phosphor-svelte/lib/FileMd";
	import FileVue from "phosphor-svelte/lib/FileVue";
	import Star from "phosphor-svelte/lib/Star";

	const EXT_ICONS = {
		ts: FileTs,
		tsx: FileTsx,
		js: FileJs,
		svelte: FileVue,
		css: FileCss,
		md: FileMd,
	} as const;

	type Ext = keyof typeof EXT_ICONS;

	type ModuleRow = {
		value: string;
		name: string;
		dir: string;
		ext: Ext;
		keywords: string[];
	};

	const AREAS = [
		"command",
		"dialog",
		"menu",
		"popover",
		"select",
		"calendar",
		"tabs",
		"accordion",
		"slider",
		"checkbox",
		"tooltip",
		"combobox",
		"context-menu",
		"meter",
		"pagination",
		"progress",
		"switch",
		"toolbar",
	] as const;

	const VERBS = [
		"use",
		"create",
		"build",
		"parse",
		"format",
		"merge",
		"resolve",
		"attach",
		"sync",
		"hydrate",
	] as const;

	const SUBJECTS = [
		"command",
		"viewport",
		"registry",
		"selection",
		"floating",
		"overlay",
		"portal",
		"focus",
		"input",
		"list",
		"group",
		"item",
		"state",
		"presence",
		"layout",
		"position",
	] as const;

	const EXTS: Ext[] = ["ts", "tsx", "svelte", "js", "css"];

	function capitalize(s: string) {
		return s.slice(0, 1).toUpperCase() + s.slice(1);
	}

	function stemForIndex(i: number) {
		const v = VERBS[i % VERBS.length];
		const s = SUBJECTS[(i * 11) % SUBJECTS.length];
		const wave = Math.floor(i / (VERBS.length * SUBJECTS.length));
		return wave === 0 ? `${v}${capitalize(s)}` : `${v}${capitalize(s)}${wave}`;
	}

	function extForIndex(i: number): Ext {
		return EXTS[i % EXTS.length];
	}

	function toKeywords(parts: string[]) {
		const out: string[] = [];
		for (const p of parts) {
			if (!p) continue;
			out.push(p, p.toLowerCase());
			for (const piece of p.split(/[-./]/)) {
				if (piece) out.push(piece, piece.toLowerCase());
			}
		}
		return [...new Set(out)];
	}

	function makeModuleRows(count: number, offset: number): ModuleRow[] {
		const rows: ModuleRow[] = [];
		for (let n = 0; n < count; n++) {
			const i = offset + n;
			const area = AREAS[i % AREAS.length];
			const ext = extForIndex(i);
			const stem = stemForIndex(i);
			const name = ext === "tsx" || ext === "js" ? `${stem}.${ext}` : `${stem}.${ext}`;
			const dir = `packages/bits-ui/src/lib/bits/${area}`;
			rows.push({
				value: `m-${i}`,
				name,
				dir: `${dir}/${name}`,
				ext,
				keywords: toKeywords([area, stem, name, ext, dir]),
			});
		}
		return rows;
	}

	/** Large list to stress-search and scroll performance; totals ~2.5k items with pinned rows */
	const MODULE_COUNT = 2488;
	const modules = makeModuleRows(MODULE_COUNT, 0);

	const pinned: Array<{
		value: string;
		name: string;
		dir: string;
		ext: Ext;
		keywords: string[];
	}> = [
		{
			value: "p-root",
			name: "command.svelte.ts",
			dir: "packages/bits-ui/src/lib/bits/command",
			ext: "ts",
			keywords: ["command", "root", "state", "bits-ui"],
		},
		{
			value: "p-viewport",
			name: "command-viewport.svelte",
			dir: "packages/bits-ui/src/lib/bits/command/components",
			ext: "svelte",
			keywords: ["viewport", "command", "list"],
		},
		{
			value: "p-types",
			name: "types.ts",
			dir: "packages/bits-ui/src/lib/bits/command",
			ext: "ts",
			keywords: ["types", "command"],
		},
		{
			value: "p-label",
			name: "_command-label.svelte",
			dir: "packages/bits-ui/src/lib/bits/command/components",
			ext: "svelte",
			keywords: ["label", "a11y", "command"],
		},
		{
			value: "p-docs",
			name: "command.md",
			dir: "docs/content/components",
			ext: "md",
			keywords: ["documentation", "markdown", "command"],
		},
		{
			value: "p-demo",
			name: "command-demo-large-list.svelte",
			dir: "docs/src/lib/components/demos",
			ext: "svelte",
			keywords: ["demo", "docs", "performance"],
		},
		{
			value: "p-score",
			name: "computeCommandScore",
			dir: "packages/bits-ui/src/lib/bits/command (filter)",
			ext: "ts",
			keywords: ["filter", "score", "search", "algorithm"],
		},
		{
			value: "p-index",
			name: "index.ts",
			dir: "packages/bits-ui/src/lib/bits/command",
			ext: "ts",
			keywords: ["exports", "barrel", "command"],
		},
	];

	const itemRowClass =
		"rounded-button data-selected:bg-muted outline-hidden flex cursor-pointer select-none items-center gap-3 px-3 py-2 text-sm";

	const totalCount = pinned.length + modules.length;
</script>

<Command.Root
	class="divide-border border-muted bg-background flex h-full w-full flex-col divide-y self-start overflow-hidden rounded-xl border shadow-sm"
>
	<Command.Input
		autofocus={false}
		class="focus-override h-input placeholder:text-foreground-alt/50 bg-background focus:outline-hidden inline-flex truncate rounded-tl-xl rounded-tr-xl px-4 text-sm transition-colors focus:ring-0"
		placeholder={`Jump to file — ${totalCount.toLocaleString()} symbols indexed`}
	/>
	<Command.List class="max-h-[min(400px,55vh)] overflow-y-auto overflow-x-hidden px-1.5 pb-2">
		<Command.Viewport>
			<Command.Empty
				class="text-muted-foreground flex w-full items-center justify-center pb-6 pt-10 text-sm"
			>
				No files matched your query.
			</Command.Empty>

			<Command.Group>
				<Command.GroupHeading
					class="text-muted-foreground flex items-center gap-2 px-3 pb-1.5 pt-4 text-xs font-medium tracking-wide"
				>
					<Star class="text-amber-500 size-3.5" weight="fill" />
					Pinned
				</Command.GroupHeading>
				<Command.GroupItems class="space-y-0.5">
					{#each pinned as row (row.value)}
						{@const Icon = EXT_ICONS[row.ext]}
						<Command.Item class={itemRowClass} value={row.value} keywords={row.keywords}>
							<div
								class="bg-muted/80 text-muted-foreground flex size-8 shrink-0 items-center justify-center rounded-lg"
							>
								<Icon class="size-4" />
							</div>
							<div class="min-w-0 flex-1">
								<div class="truncate font-medium">
									{row.name}
								</div>
								<div class="text-muted-foreground truncate font-mono text-xs">
									{row.dir}
								</div>
							</div>
							<span
								class="text-muted-foreground shrink-0 rounded-md border border-transparent bg-foreground/[0.04] px-1.5 py-0.5 font-mono text-[10px] uppercase"
							>
								{row.ext}
							</span>
						</Command.Item>
					{/each}
				</Command.GroupItems>
			</Command.Group>

			<Command.Separator class="bg-foreground/5 my-2 h-px w-full" />

			<Command.Group>
				<Command.GroupHeading class="text-muted-foreground px-3 pb-1.5 pt-2 text-xs font-medium">
					Library · {modules.length.toLocaleString()} modules
				</Command.GroupHeading>
				<Command.GroupItems class="space-y-0.5">
					{#each modules as row (row.value)}
						{@const Icon = EXT_ICONS[row.ext]}
						<Command.Item class={itemRowClass} value={row.value} keywords={row.keywords}>
							<div
								class="bg-muted/50 text-muted-foreground flex size-8 shrink-0 items-center justify-center rounded-lg"
							>
								<Icon class="size-4" />
							</div>
							<div class="min-w-0 flex-1">
								<div class="truncate font-medium">
									{row.name}
								</div>
								<div class="text-muted-foreground truncate font-mono text-xs">
									{row.dir}
								</div>
							</div>
							<span
								class="text-muted-foreground shrink-0 rounded-md border border-transparent bg-foreground/[0.04] px-1.5 py-0.5 font-mono text-[10px] uppercase"
							>
								{row.ext}
							</span>
						</Command.Item>
					{/each}
				</Command.GroupItems>
			</Command.Group>
		</Command.Viewport>
	</Command.List>
</Command.Root>
