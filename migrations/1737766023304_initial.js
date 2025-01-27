/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createExtension("vector");
  pgm.createTable("chat", {
    id: {
      type: "varchar(100)",
      primaryKey: true,
    },
    tagline: { type: "varchar(1000)" },
    user_id: { type: "varchar(1000)" },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    updated_at: {
      type: "timestamp",
      notNull: true,
      onUpdate: pgm.func("current_timestamp"),
      default: pgm.func("current_timestamp"),
    },
  });
  pgm.createTable("chat_message", {
    id: {
      type: "varchar(100)",
      primaryKey: true,
    },
    chat_id: { type: "varchar(1000)" },
    user_id: { type: "varchar(1000)" },
    content: { type: "text" },
    experimental_attachments: { type: "text" },
    data: { type: "text" },
    role: { type: "varchar(1000)" },
    annotations: { type: "text" },
    tool_invocations: { type: "text" },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    updated_at: {
      type: "timestamp",
      notNull: true,
      onUpdate: pgm.func("current_timestamp"),
      default: pgm.func("current_timestamp"),
    },
  });
  pgm.createTable("token", {
    id: {
      type: "varchar(100)",
      primaryKey: true,
    },
    name: { type: "varchar(500)" },
    symbol: { type: "varchar(500)" },
    decimals: { type: "integer" },
    tags: { type: "varchar(100) ARRAY" },
    logo_uri: { type: "text" },
    freeze_authority: { type: "text" },
    mint_authority: { type: "text" },
    permanent_delegate: { type: "text" },
    extensions: { type: "text" },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    updated_at: {
      type: "timestamp",
      notNull: true,
      onUpdate: pgm.func("current_timestamp"),
      default: pgm.func("current_timestamp"),
    },
  });
  pgm.createTable("knowledge", {
    id: {
      type: "uuid",
      default: pgm.func("gen_random_uuid()"),
      primaryKey: true,
    },
    base_url: { type: "varchar(500)" },
    name: { type: "varchar(500)" },
    summary: { type: "text" },
    summary_embedding: { type: "vector(1536)" },
    markdown: { type: "text" },
    mardown_embedding: { type: "vector(1536)" },
    url: { type: "varchar(500)" },
    title: { type: "varchar(500)" },
    description: { type: "varchar(500)" },
    favicon: { type: "varchar(500)" },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    updated_at: {
      type: "timestamp",
      notNull: true,
      onUpdate: pgm.func("current_timestamp"),
      default: pgm.func("current_timestamp"),
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable("chat");
  pgm.dropTable("chat_message");
  pgm.dropTable("token");
  pgm.dropTable("knowledge");
  pgm.dropExtension("vector");
};
