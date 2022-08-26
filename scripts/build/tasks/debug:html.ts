/**
 * The commands above limit the messages from debug to Eleventy specific things with DEBUG=Eleventy* but you can view all of the messages from any dependency with DEBUG=*
 *
 * @TODO: Think I'm setting this by default in the build:html task, maybe should be separated out?
 *
 * Use the following debug command to show performance measurements
 * for all output entries and not just those that take longer than 8%:
 * DEBUG=Eleventy:Benchmark* npx @11ty/eleventy
 */