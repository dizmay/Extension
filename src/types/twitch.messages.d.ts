declare namespace Twitch {
	export interface AnyMessage {
		id: string;
		type: number;

		seventv?: boolean;
		t?: number;
		element?: HTMLElement;
		sendState?: "sending" | "sent" | "failed";
		channelID?: string;
		notifySent?: () => void;
	}

	export interface DisplayableMessage extends AnyMessage {
		user: ChatUser | null;
		message?: ChatMessage;
		messageParts?: ChatMessage.Part[];
		badges?: Record<string, string>;
		deleted?: boolean;
		banned?: boolean;
		nonce?: string;
	}

	export interface ChatMessage extends AnyMessage {
		user: ChatUser;
		badgeDynamicData: object;
		badges: Record<string, string>;
		banned: boolean;
		bits: number;
		deleted: boolean;
		hidden: boolean;
		isHistorical: unknown;
		message: string | ChatMessage;
		messageBody: string;
		messageParts: ChatMessage.Part[];
		messageType: number;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		emotes?: any;
		timestamp: number;
		reply?: {
			parentDeleted: boolean;
			parentMsgId: string;
			parentMessageBody: string;
			parentUid: string;
			parentUserLogin: string;
			parentDisplayName: string;
		};
	}

	export interface SubMessage extends AnyMessage {
		user: ChatUser;
		channel: string;
		methods?: {
			plan: string;
			planName: string;
			prime: boolean;
		};
		message?: ChatMessage;
		months?: number;
		cumulativeMonths?: number;
		shouldShareStreakTenure: boolean;
		wasGift: boolean;
		recipientDisplayName?: string;
		giftMonths?: number;
		streakMonths?: number;
	}

	export namespace ChatMessage {
		export interface Part {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			content: any;
			type: number;
		}

		export interface TextPart extends Part {
			content: string;
		}

		export interface FlaggedSegmentPart extends Part {
			categories: { [key: string]: boolean };
			content: TextPart;
			length: number;
			originalText: string;
		}

		export interface LinkPart extends Part {
			content: {
				displayText: string;
				url: string;
			};
		}

		export interface MentionPart extends Part {
			content: {
				recipient: string;
				currentUserMentionRelation: number;
			};
		}

		export interface EmotePart extends Part {
			content: {
				alt: string;
				emoteID?: string;
				images?: {
					dark: {
						"1x": string;
						"2x": string;
						"3x": string;
						"4x": string;
					};
					light: {
						"1x": string;
						"2x": string;
						"3x": string;
						"4x": string;
					};
					themed: boolean;
				};

				// Only exists if cheermote
				cheerAmount?: number;
				cheerColor?: string;
			};
		}

		export interface AppPart {
			type: "text" | "emote" | "twitch-emote" | "link" | "mention";
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			content?: string | { [key: string]: any };
		}
	}

	export interface ModerationMessage extends AnyMessage {
		duration: number;
		moderationType: number;
		reason: string;
		userLogin: string;
		targetMessageID?: string;
	}

	export interface ChannelPointsRewardMessage extends AnyMessage {
		displayName: string;
		login: string;
		message: ChatMessage;
		reward: {
			cost: number;
			isHighlighted: boolean;
			name: string;
		};
		userID: string;
	}

	export interface MassGiftMessage extends AnyMessage {
		user: ChatUser;
		channel: string;
		massGiftCount: number;
		plan: string;
		senderCount: number;
	}

	export interface RaidMessage extends AnyMessage {
		channel: string;
		userLogin: string;
		params: {
			displayName: string;
			login: string;
			msgId: string;
			userID: string;
			viewerCount: string;
		};
	}

	export interface AnnouncementMessage extends AnyMessage {
		color: "PRIMARY" | "BLUE" | "GREEN" | "ORANGE" | "PURPLE";
		message: ChatMessage;
	}

	export interface IDUpdateMessage extends AnyMessage {
		nonce: string;
		userLogin: string;
	}

	export interface SeventvEmoteSetUpdateMessage extends DisplayableMessage {
		app_user: SevenTV.User;
		add: SevenTV.ActiveEmote[];
		remove: SevenTV.ActiveEmote[];
	}
}
