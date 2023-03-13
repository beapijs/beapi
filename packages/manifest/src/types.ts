// Microsoft docs for Bedrock Edition are a disgrace
// I am unsure which properties are optional and required
// this will most likely need to be revised later.

// STUB - https://learn.microsoft.com/en-us/minecraft/creator/reference/content/addonsreference/examples/addonmanifest

export enum FormatVersion {
	One = 1,
	Two = 2,
}

export type VersionTuple = [major: number, minor: number, revision: number];

export interface ManifestHeader {
	/**
	 * This is the version of the base game your world template
	 * requires, specified as [majorVersion, minorVersion, revision].
	 * We use this to determine what version of the base game
	 * resource and behavior packs to apply when your content is used.
	 */
	base_game_version: VersionTuple;
	/**
	 * This is a short description of the pack. It will appear in the
	 * game below the name of the pack. We recommend keeping it to 1-2
	 * lines.
	 */
	description: string;
	/**
	 * This option is required for any world templates. This will lock
	 * the player from modifying the options of the world.
	 */
	lock_template_options: boolean;
	/**
	 * This is the minimum version of the game that this pack was written
	 * for. This is a required field for resource and behavior packs.
	 * This helps the game identify whether any backwards compatibility
	 * is needed for your pack. You should always use the highest version
	 * currently available when creating packs.
	 */
	min_engine_version: string;
	/**
	 * This is the name of the pack as it appears within Minecraft.
	 * This is a required field.
	 */
	name: string;
	/**
	 * This is a special type of identifier that uniquely identifies
	 * this pack from any other pack. UUIDs are written in the format
	 * xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx where each x is a hexadecimal
	 * value (0-9 or a-f). We recommend using an online service to generate
	 * this and guarantee their uniqueness.
	 */
	uuid: string;
	/**
	 * This is the version of your pack in the format
	 * [majorVersion, minorVersion,revision]. The version number is used when
	 * importing a pack that has been imported before. The new pack will replace
	 * the old one if the version is higher, and ignored if it's the same or lower.
	 */
	version: VersionTuple;
}

export interface ManifestModules {
	/**
	 * This is a short description of the module. This is not user-facing at the
	 * moment but is a good place to remind yourself why the module is defined.
	 */
	description: string;
	/**
	 * This is the type of the module. Can be any of the following: resources,
	 * data, client_data, interface, world_template or javascript.
	 */
	type: string;
	/**
	 * This is a unique identifier for the module in the same format as the
	 * pack's UUID in the header. This should be different from the pack's UUID,
	 * and different for every module.
	 */
	uuid: string;
	/**
	 * This is the version of the module in the same format as the pack's version
	 * in the header. This can be used to further identify changes in your pack.
	 */
	version: VersionTuple;
}

export interface ManifestDependencies {
	/**
	 * This is the unique identifier of the pack that this pack depends on. It
	 * needs to be the exact same UUID that the pack has defined in the header
	 * section of its manifest file.
	 */
	uuid: string;
	/**
	 * This is the specific version of the pack that your pack depends on.
	 * Should match the version the other pack has in its manifest file.
	 */
	version: VersionTuple;
}

/**
 * `chemistry` - The pack can add, remove, or modify chemistry behavior.
 *
 * `editorExtension` - Indicates that this pack contains extensions for editing.
 *
 * `experimental_custom_ui` - The pack can use HTML files to create custom UI,
 *  as well as use or modify the custom UI.
 *
 * `raytraced` - The pack uses Ray Tracking functionality and may use custom
 *  shaders.
 */
export enum ManifestCapabilities {
	/**
	 * The pack can add, remove, or modify chemistry behavior.
	 */
	Chemistry = 'chemistry',
	/**
	 * Indicates that this pack contains extensions for editing.
	 */
	EditorExtension = 'editorExtension',
	/**
	 * The pack can use HTML files to create custom UI,
	 * as well as use or modify the custom UI.
	 */
	ExperimentalCustomUI = 'experimental_custom_ui',
	/**
	 * The pack uses Ray Tracking functionality and may use custom
	 *  shaders.
	 */
	RTX = 'raytraced',
}

export interface Manifest {
	/**
	 * Section containing optional features that can be enabled in
	 * Minecraft.
	 */
	capabilities: ManifestCapabilities[];
	/**
	 * Section containing definitions for any other packs that are
	 * required in order for this manifest.json file to work.
	 */
	dependencies: ManifestDependencies[];
	/**
	 * The syntax version used in the manifest file. This may be 1 for
	 * skin packs or 2 for resource, behavior, and world packs.
	 */
	format_version: FormatVersion;

	/**
	 * Section containing information regarding the name of the pack,
	 * description, and other features that are public facing.
	 */
	header: ManifestHeader;

	/**
	 * Section containing information regarding the type of content
	 * that is being brought in.
	 */
	modules: ManifestModules[];
}
